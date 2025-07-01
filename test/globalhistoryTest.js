import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage.js';
import globalhistoryPage from '../page/globalhistoryPage.js';
import moment from 'moment';

const timestamp = moment().format('YYYYMMDD_HHmmss');

let title = '';
let type = '';

fixture('Add/Edit/Delete Items and Validate Global History')
  .page(process.env.STAGING_URL)
  .skipJsErrors(true)
  .beforeEach(async () => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  })
  .afterEach(async t => {
    await t.setNativeDialogHandler(() => true);

    switch (type) {
      case 'Assets':
        await loginPage.selectAssetsTab();
        await globalhistoryPage.deleteAsset(title);
        break;
      case 'Series':
        await loginPage.selectSeriesTab();
        await globalhistoryPage.deleteSeries(title);
        break;
      case 'Collections':
        await loginPage.selectCollectionsTab();
        await globalhistoryPage.deleteCollection(title);
        break;
      default:
        console.warn(`No delete action for type: ${type}`);
    }
  });

test('Add/Edit/Delete Assets and Validate Global History', async () => {
  title = `${process.env.ASSET_TITLE}_${timestamp}`;
  type = 'Assets';

  const synopsis = process.env.ASSET_SYNOPSIS;
  const newSynopsis = process.env.NEW_ASSET_SYNOPSIS;
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM D YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');

  await loginPage.selectQATestAccount();
  await loginPage.selectAssetsTab();
  await globalhistoryPage.addAsset(title, synopsis);
  await globalhistoryPage.editAsset(newSynopsis);
  await globalhistoryPage.globalhistoryFilter(type);
  await globalhistoryPage.verifyObjectType(type);
  await globalhistoryPage.verifyUserType();
  await globalhistoryPage.verifyNewObjectHistory(title, expectedDate, expectedTime, type, nowUTC);
});

test('Add/Edit/Delete Series and Validate Global History', async () => {
  title = `${process.env.SERIES_TITLE}_${timestamp}`;
  type = 'Series';

  const synopsis = process.env.SERIES_SYNOPSIS;
  const newSynopsis = process.env.NEW_SERIES_SYNOPSIS;
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM D YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');

  await loginPage.selectQATestAccount();
  await loginPage.selectSeriesTab();
  await globalhistoryPage.addSeries(title, synopsis);
  await globalhistoryPage.editSeries(newSynopsis);
  await globalhistoryPage.globalhistoryFilter(type);
  await globalhistoryPage.verifyObjectType(type);
  await globalhistoryPage.verifyUserType();
  await globalhistoryPage.verifyNewObjectHistory(title, expectedDate, expectedTime, type, nowUTC);
});

test('Add/Edit/Delete Collections and Validate Global History', async () => {
  title = `${process.env.COLLECTION_TITLE}_${timestamp}`;
  type = 'Collections';

  const synopsis = process.env.COLLECTION_SYNOPSIS;
  const newSynopsis = process.env.NEW_COLLECTION_SYNOPSIS;
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM D YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');

  await loginPage.selectQATestAccount();
  await loginPage.selectCollectionsTab();
  await globalhistoryPage.addCollection(title, synopsis);
  await globalhistoryPage.editCollection(newSynopsis);
  await globalhistoryPage.globalhistoryFilter(type);
  await globalhistoryPage.verifyObjectType(type);
  await globalhistoryPage.verifyUserType();
  await globalhistoryPage.verifyNewObjectHistory(title, expectedDate, expectedTime, type, nowUTC);
});
