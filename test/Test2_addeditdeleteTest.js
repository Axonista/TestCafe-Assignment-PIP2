import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import dotenv from 'dotenv';
dotenv.config();
import addeditdeletePage from '../page/addeditdeletePage.js'
import loginPage from '../page/loginPage.js';
import globalhistoryPage from '../page/globalhistoryPage.js';
import moment from 'moment';

let title = '';
let type = '';
const accountname = 'QA Test Account';

fixture('Add/Edit Assets, Series, Collection and Verify Global History Test')
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, accountname);
  })

  .afterEach(async t => {
    await t.setNativeDialogHandler(() => true);
    await addeditdeletePage.deleteTest(title, type); 
  });

test("Add/Edit Asset and Validate Global History", async t => {

  title = process.env.ASSET_TITLE;
  const synopsis = process.env.ASSET_SYNOPSIS;
  const newSynopsis = process.env.NEW_ASSET_SYNOPSIS;
  type = 'Assets';
  await addeditdeletePage.addTest(title, synopsis , type);
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM DD YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');   // e.g., "00:17:46 UTC"
  console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  await addeditdeletePage.editTest(newSynopsis , type);
  await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime , type , nowUTC);
});

test("Add/Edit Series and Validate Global History", async t => {

  title = process.env.SERIES_TITLE;
  const synopsis = process.env.SERIES_SYNOPSIS;
  const newSynopsis = process.env.NEW_SERIES_SYNOPSIS;
  type = 'Series';

  await addeditdeletePage.addTest(title, synopsis , type);
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM DD YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');  
  console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  await addeditdeletePage.editTest(newSynopsis , type);
  await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime , type , nowUTC);
});

test("Add/Edit Collection and Validate Global History", async t => {

  title = process.env.COLLECTION_TITLE;
  const synopsis = process.env.COLLECTION_SYNOPSIS;
  const newSynopsis = process.env.NEW_COLLECTION_SYNOPSIS;
  type = 'Collections';

  await addeditdeletePage.addTest(title, synopsis , type);
  const nowUTC = moment.utc();
  const expectedDate = nowUTC.format('MMM DD YYYY');
  const expectedTime = nowUTC.format('HH:mm:ss [UTC]');  
  console.log(`Captured expected timestamp: ${expectedDate} ${expectedTime}`);
  await addeditdeletePage.editTest(newSynopsis, type);
  await globalhistoryPage.verifyassetGlobalHistory(title , expectedDate , expectedTime ,type, nowUTC);
});
