import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
import uiresponsePage from '../page/uiresponsePage';
dotenv.config();



fixture('UI Responsiveness Tests')
  .page(process.env.ISM_WEBSITE)
  .skipJsErrors()
  .beforeEach(async t => {
    
  });
 test('Chrome Test', async t => {
  
  const browserName = t.browser.name.toLowerCase();
  await t.resizeWindow(375, 667);
  console.log('Testing on Iphone SE screen...');
  await uiresponsePage.validateElements();
  await uiresponsePage.checkLinkAlignment();
  await uiresponsePage.checkdescriptionAlignment();
  await uiresponsePage.checkHeaderLayout();
  await t.takeScreenshot({ path: `screenshots/${browserName}/IPHONE-SE.png`, fullPage: true });

  await t.resizeWindow(430, 932);
  console.log('Testing on Iphone 14 PRO screen...');
  await uiresponsePage.validateElements();
  await uiresponsePage.checkLinkAlignment();
  await uiresponsePage.checkdescriptionAlignment();
  await uiresponsePage.checkHeaderLayout();
  await t.takeScreenshot({ path: `screenshots/${browserName}/IPHONE-14-PRO.png`, fullPage: true });

  await t.resizeWindow(402 , 874);
  console.log('Testing on Iphone 16 pro screen...');
  await uiresponsePage.validateElements();
  await uiresponsePage.checkLinkAlignment();
  await uiresponsePage.checkdescriptionAlignment();
  await uiresponsePage.checkHeaderLayout();
  await t.takeScreenshot({ path: `screenshots/${browserName}/IPHONE-16-PRO.png`, fullPage: true });

  await t.resizeWindow(768, 1024);
  console.log('Testing on Tablet screen...');
  await uiresponsePage.validateElements();
  await uiresponsePage.checkLinkAlignment();
  await uiresponsePage.checkdescriptionAlignment();
  await uiresponsePage.checkHeaderLayout();
  await t.takeScreenshot({ path: `screenshots/${browserName}/TABLET.png`, fullPage: true });

  await t.resizeWindow(1280, 800);
  console.log('Testing on Desktop screen...');
  await uiresponsePage.validateElements();
  await uiresponsePage.checkLinkAlignment();
  await uiresponsePage.checkdescriptionAlignment();
  await uiresponsePage.checkHeaderLayout();
  await t.takeScreenshot({ path: `screenshots/${browserName}/DESKTOP.png`, fullPage: true });
 });
  
 
