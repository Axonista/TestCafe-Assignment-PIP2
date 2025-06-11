import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import { MailSlurp } from 'mailslurp-client';
import userinvitationPage from '../page/userinvitationPage.js';
import 'dotenv/config';


fixture('Staging Regression Tests - Global History Test')
  .page('https://cms.staging.pi07.ediflo.tv/')
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await userinvitationPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  });

  test("Add/Edit Asset, Series, and Collection and Validate Global History", async t => {
  


  
});
