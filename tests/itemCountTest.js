import { Selector } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();
import loginPage from '../page/loginPage.js';
import itemCountPage from '../page/itemCountPage.js';

fixture('Remoco API Tests')
  .page(process.env.STAGING_URL)
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    await loginPage.selectAccount('Texas Rangers');
  });

test('Validate that UI and API Asset count match', async t => {
  await loginPage.selectAssetsTab();
  const cmsCount = await itemCountPage.uiapiAssetCount();

  const resp = await t.request({
    url: process.env.EVENTS_ENDPOINT,
    method: 'GET',
    headers: {
      'API-Key': process.env.APIKEY,
      'Channel-Code': process.env.CHANNELCODE,
    }
  });

  console.log(`Assets Response Status:`, resp.status);
  const responseText = JSON.stringify(resp.body);
  const apiCount = resp.body.list.filter(item => item.self && item.self.includes("/events/")).length;

  console.log(`Total Assets: ${apiCount}`);

  await t.expect(apiCount).eql(
    cmsCount,
    `Mismatch between CMS and API counts for Assets:\nCMS: ${cmsCount}\nAPI: ${apiCount}`
  );
});

test('Validate that UI and API Series count match', async t => {
  await loginPage.selectSeriesTab();
  const cmsCount = await itemCountPage.uiapiSeriesCount();

  const resp = await t.request({
    url: process.env.SERIES_ENDPOINT,
    method: 'GET',
    headers: {
      'API-Key': process.env.APIKEY,
      'Channel-Code': process.env.CHANNELCODE,
    }
  });

  console.log(`Series Response Status:`, resp.status);
  const responseText = JSON.stringify(resp.body);
  const apiCount = resp.body.list.filter(item => item.self && item.self.includes("/series/")).length;

  console.log(`Total Series: ${apiCount}`);

  await t.expect(apiCount).eql(
    cmsCount,
    `Mismatch between CMS and API counts for Series:\nCMS: ${cmsCount}\nAPI: ${apiCount}`
  );
});

test('Validate that UI and API Collections count match', async t => {
  await loginPage.selectCollectionsTab();
  const cmsCount = await itemCountPage.uiapiCollectionCount();

  const resp = await t.request({
    url: process.env.COLLECTIONS_ENDPOINT,
    method: 'GET',
    headers: {
      'API-Key': process.env.APIKEY,
      'Channel-Code': process.env.CHANNELCODE,
    }
  });

  console.log(`Collections Response Status:`, resp.status);
  const responseText = JSON.stringify(resp.body);
  const apiCount = resp.body.list.filter(item => item.self && item.self.includes("/collections/")).length;

  console.log(`Total Collections: ${apiCount}`);

  await t.expect(apiCount).eql(
    cmsCount,
    `Mismatch between CMS and API counts for Collections:\nCMS: ${cmsCount}\nAPI: ${apiCount}`
  );
});
