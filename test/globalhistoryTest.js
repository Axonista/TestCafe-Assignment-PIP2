import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import objectsPage from '../page/objectsPage.js';
import loginPage from '../page/loginPage.js';
import globalhistoryPage from '../page/globalhistoryPage.js';
import moment from 'moment';

const timestamp = moment().format('YYYYMMDD_HHmmss');

const testData = [
  {
    type: 'Assets',
    title: `${process.env.ASSET_TITLE}_${timestamp}`,
    synopsis: process.env.ASSET_SYNOPSIS,
    newSynopsis: process.env.NEW_ASSET_SYNOPSIS,
    addMethod: 'addAsset',
    editMethod: 'editAsset',
    deleteMethod: 'deleteAsset',
  },
  {
    type: 'Series',
    title: `${process.env.SERIES_TITLE}_${timestamp}`,
    synopsis: process.env.SERIES_SYNOPSIS,
    newSynopsis: process.env.NEW_SERIES_SYNOPSIS,
    addMethod: 'addSeries',
    editMethod: 'editSeries',
    deleteMethod: 'deleteSeries',
  },
  {
    type: 'Collections',
    title: `${process.env.COLLECTION_TITLE}_${timestamp}`,
    synopsis: process.env.COLLECTION_SYNOPSIS,
    newSynopsis: process.env.NEW_COLLECTION_SYNOPSIS,
    addMethod: 'addCollection',
    editMethod: 'editCollection',
    deleteMethod: 'deleteCollection',
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
      await globalhistoryPage[data.deleteMethod](data.title);
    });

  test(`Add/Edit/Delete ${data.type} and Validate Global History`, async () => {
    const nowUTC = moment.utc();
    const expectedDate = nowUTC.format('MMM DD YYYY');
    const expectedTime = nowUTC.format('HH:mm:ss [UTC]');

    console.log(`Running test for: ${data.type}`);
    console.log(`Captured timestamp: ${expectedDate} ${expectedTime}`);

    await globalhistoryPage.selectAccount();
    await globalhistoryPage[data.addMethod](data.title, data.synopsis);
    await globalhistoryPage[data.editMethod](data.newSynopsis);
    await objectsPage.verifyassetGlobalHistory(data.title,expectedDate,expectedTime,data.type,nowUTC);
  });
}
