import { Selector } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage';
import Test3_collectionscountPage from '../page/Test3_collectionscountPage';

const accountname = 'Texas Rangers';

fixture(`Collection Remoco API Test`)
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, accountname);
  });

test('Count of collections in response', async t => {

  const type = 'Collections';

  // Step 1: Get CMS/UI count
  const cmscollectionCount = await Test3_collectionscountPage.uiapiCount(type);

  const resp = await t.request({
    url: process.env.COLLECTIONS_ENDPOINT,
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
  const apicollectioncount = (responseText.match(/"type"\s*:\s*"LibraryCollection"/g) || []).length;

  console.log(`Total collections : ${apicollectioncount}`);

  // Step 4: Compare and fail if mismatch
  await t.expect(apicollectioncount).eql(cmscollectionCount, `Mismatch between CMS and API counts:\nCMS: ${cmscollectionCount}\nAPI: ${apicollectioncount}`
  );

});
