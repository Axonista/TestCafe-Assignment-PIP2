import { Selector } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage';
import Test3_seriescountPage from '../page/Test3_seriescountPage';

const accountname = 'Texas Rangers';

fixture(`Remoco API Test`)
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, accountname);
  });

test('Count LibraryEvent assets using regex in response', async t => {

  const type = 'Series';

  // Step 1: Get CMS/UI count
  const cmsSeriesCount = await Test3_seriescountPage.uiapiCount(type);

  const resp = await t.request({
    url: process.env.SERIES_ENDPOINT,
    method: 'GET',
    headers: {
      'API-Key': process.env.APIKEY,
      'Channel-Code': process.env.CHANNELCODE
    }
  });

  console.log('Response status:', resp.status);

  // Convert response body to string
  const responseText = JSON.stringify(resp.body);

  // Count "LibraryEvent" using regex
  const apiseriescount = (responseText.match(/"type"\s*:\s*"LibrarySeries"/g) || []).length;

  console.log(`Total assets: ${apiseriescount}`);

  // Step 4: Compare and fail if mismatch
  await t.expect(apiseriescount).eql(cmsSeriesCount, `Mismatch between CMS and API counts:\nCMS: ${cmsSeriesCount}\nAPI: ${apiseriescount}`
  );

});
