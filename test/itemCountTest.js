import { Selector } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage.js';
import itemCountPage from '../page/itemCountPage.js';

const testData = [
  {
    type: 'Assets',
    endpoint: process.env.EVENTS_ENDPOINT,
    Type: /"type"\s*:\s*"LibraryEvent"/g,
    getCount: () => itemCountPage.uiapiAssetCount(),
  },
  {
    type: 'Series',
    endpoint: process.env.SERIES_ENDPOINT,
    Type: /"type"\s*:\s*"LibrarySeries"/g,
    getCount: () => itemCountPage.uiapiSeriesCount(),
  },
  {
    type: 'Collections',
    endpoint: process.env.COLLECTIONS_ENDPOINT,
    Type: /"type"\s*:\s*"LibraryCollection"/g,
    getCount: () => itemCountPage.uiapiCollectionCount(),
  }
];

for (const data of testData) {
  fixture(`${data.type} Remoco API Test`)
    .page(process.env.STAGING_URL)
    .skipJsErrors()
    .beforeEach(async t => {
      await t.maximizeWindow();
      await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    });

  test(`Count ${data.type} using regex in API response`, async t => {
    const cmsCount = await data.getCount(); // ✅ Call the correct method
    const resp = await t.request({
      url: data.endpoint,
      method: 'GET',
      headers: {
        'API-Key': process.env.APIKEY,
        'Channel-Code': process.env.CHANNELCODE,
      }
    });

    console.log(`${data.type} Response Status:`, resp.status);
    const responseText = JSON.stringify(resp.body);
    const apiCount = (responseText.match(data.Type) || []).length;

    console.log(`Total ${data.type}: ${apiCount}`);

    await t.expect(apiCount).eql(
      cmsCount,
      `Mismatch between CMS and API counts for ${data.type}:\nCMS: ${cmsCount}\nAPI: ${apiCount}`
    );
  });
}
