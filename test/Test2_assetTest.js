import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import dotenv from 'dotenv';
dotenv.config();
import assetPage from '../page/assetPage.js';
import loginPage from '../page/loginPage.js';
import globalhistoryPage from '../page/globalhistoryPage.js';
import moment from 'moment';

let title = '';
let type = '';


fixture('Add/Edit Assets, Series, Collection and Verify Global History Test')
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  })

  .afterEach(async t => {
    await t.setNativeDialogHandler(() => true);
    await assetPage.deleteTest(title, type); 
  });

test("Add/Edit Asset and Validate Global History", async t => {

  title = process.env.ASSET_TITLE;
  const synopsis = process.env.ASSET_SYNOPSIS;
  const newSynopsis = process.env.NEW_ASSET_SYNOPSIS;
  type = 'Assets';
  await assetPage.addTest(title, synopsis , type);
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM DD YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');   // e.g., "00:17:46 UTC"
  console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  await assetPage.editTest(newSynopsis, title , type);
  await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime);
});

test("Add/Edit Series and Validate Global History", async t => {

  title = process.env.SERIES_TITLE;
  const synopsis = process.env.SERIES_SYNOPSIS;
  const newSynopsis = process.env.NEW_SERIES_SYNOPSIS;
  type = 'Series';

  await assetPage.addTest(title, synopsis , type);
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM DD YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');  
  console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  await assetPage.editTest(newSynopsis, title , type);
  await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime);
});

//test("Add/Edit Collection and Validate Global History", async t => {

  //title = process.env.COLLECTION_TITLE;
  //const synopsis = process.env.COLLECTION_SYNOPTIS;
  //const newSynopsis = process.env.NEW_COLLECTION_SYNOPSIS;
  //const type = 'Collections';

  //await assetPage.addTest(title, synopsis , type);
  //const nowUTC = moment.utc();
  //const expectedDate = nowUTC.format('MMM DD YYYY');
  //const expectedTime = nowUTC.format('HH:mm:ss [UTC]');  
  //console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  //await assetPage.editTest(newSynopsis, title);
  //await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime);
//});
