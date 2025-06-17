import { Selector } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage';
import Test3_assetscountPage from '../page/Test3_assetscountPage';

const accountname = 'Texas Rangers';

fixture(`Assets Remoco API Test`)
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, accountname);
  });

test('Count of assets in response', async t => {

  const type = 'Assets';

  // Step 1: Get CMS/UI count
  const cmsAssetCount = await Test3_assetcountPage.uiapiCount(type);

  const resp = await t.request({
    url: process.env.EVENTS_ENDPOINT,
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
  const apiassetcount = (responseText.match(/"type"\s*:\s*"LibraryEvent"/g) || []).length;

  console.log(`Total assets: ${apiassetcount}`);

  // Step 4: Compare and fail if mismatch
  await t.expect(apiassetcount).eql(cmsAssetCount, `Mismatch between CMS and API counts:\nCMS: ${cmsAssetCount}\nAPI: ${apiassetcount}`
  );

});
