import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import dotenv from 'dotenv';
dotenv.config();
import objectsPage from '../page/objectsPage.js';
import loginPage from '../page/loginPage.js';
import globalhistoryPage from '../page/globalhistoryPage.js';
import moment from 'moment';

const testData = [
  {
    type: 'Assets',
    title: process.env.ASSET_TITLE,
    synopsis: process.env.ASSET_SYNOPSIS,
    newSynopsis: process.env.NEW_ASSET_SYNOPSIS,
    add: objectsPage.addAsset,
    edit: objectsPage.editAsset,
    del: objectsPage.deleteAsset,
  },
  {
    type: 'Series',
    title: process.env.SERIES_TITLE,
    synopsis: process.env.SERIES_SYNOPSIS,
    newSynopsis: process.env.NEW_SERIES_SYNOPSIS,
    add: objectsPage.addSeries,
    edit: objectsPage.editSeries,
    del: objectsPage.deleteSeries,
  },
  {
    type: 'Collections',
    title: process.env.COLLECTION_TITLE,
    synopsis: process.env.COLLECTION_SYNOPSIS,
    newSynopsis: process.env.NEW_COLLECTION_SYNOPSIS,
    add: objectsPage.addCollection,
    edit: objectsPage.editCollection,
    del: objectsPage.deleteCollection,
  },
];

for (const data of testData) {
  fixture(`Add/Edit/Delete ${data.type} and Validate Global History`)
    .page(process.env.STAGING_URL)
    .skipJsErrors(true)
    .beforeEach(async () => {
      await t.maximizeWindow();
      await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    })
    .afterEach(async () => {
      await t.setNativeDialogHandler(() => true);
      await data.del.call(objectsPage, data.title);
    });

  test(`Add/Edit/Delete ${data.type} and Validate Global History`, async () => {
    const nowUTC = moment.utc();
    const expectedDate = nowUTC.format('MMM DD YYYY');
    const expectedTime = nowUTC.format('HH:mm:ss [UTC]');

    console.log(`Running test for: ${data.type}`);
    console.log(`Captured timestamp: ${expectedDate} ${expectedTime}`);

    await data.add.call(objectsPage, data.title, data.synopsis);
    await data.edit.call(objectsPage, data.newSynopsis);
    await globalhistoryPage.verifyassetGlobalHistory(data.title, expectedDate, expectedTime, data.type, nowUTC);
  });
}
