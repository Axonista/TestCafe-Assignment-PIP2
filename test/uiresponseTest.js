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
   await t.resizeWindow(375, 667);
  console.log('Testing on Mobile screen...');
  await uiresponsePage.validateElements();
  await t.takeScreenshot({ path: 'screenshots/mobile.png', fullPage: true });
  await t.resizeWindow(71, 147);
  console.log('Testing on Tablet screen...');
  await uiresponsePage.validateElements();
  await t.takeScreenshot({ path: 'screenshots/mobile.png', fullPage: true });
  await t.resizeWindow(77, 163);
  console.log('Testing on Desktop screen...');
  await uiresponsePage.validateElements();
  await t.takeScreenshot({ path: 'screenshots/mobile.png', fullPage: true });
});
 
