import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import { MailSlurp } from 'mailslurp-client';
import userinvitationPage from '../page/userinvitationPage.js';
import 'dotenv/config';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
console.log("MAILSLURP_API_KEY:", process.env.MAILSLURP_API_KEY);

fixture('Staging Regression Tests - Login Test')
  .page('https://cms.staging.pi07.ediflo.tv/')
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await userinvitationPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  });

test("Add new user with all data", async t => {
  
   // Create a temporary inbox
    const inbox = await mailslurp.inboxController.createInboxWithDefaults();
    const testEmail = inbox.emailAddress;
    const inviterEmail = process.env.ADMIN_EMAIL;
    console.log(`Temporary email created: ${testEmail}`);

    await userinvitationPage.invitenewUser(testEmail);
    await userinvitationPage.verifyuserInvitation(mailslurp,inbox, testEmail, inviterEmail);
    await userinvitationPage.verifyconfirmationPage();
    await userinvitationPage.deleteInbox(mailslurp , inbox);
});
