import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import { MailSlurp } from 'mailslurp-client';
import userinvitationPage from '../page/userinvitationPage.js';
import loginPage from '../page/loginPage.js';
import dotenv from 'dotenv';
dotenv.config();

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
console.log("MAILSLURP_API_KEY:");

let inbox;        // Declare in outer scope
let testEmail;  

fixture('Validate User invitation flow')
  .page(process.env.STAGING_URL + "")
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  })

.afterEach(async t => {
  if (inbox) {
    try {
      console.log("🗑 Deleting test inbox...");
      await userinvitationPage.deleteInbox(mailslurp, inbox);
    } catch (err) {
      console.error('❌ Failed to delete inbox:', err);
    }
  }

  if (testEmail) {
    try {
      console.log("🗑 Deleting test user...");
      await t.navigateTo(process.env.STAGING_URL);
      //await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      await userinvitationPage.deleteUser(testEmail);
    } catch (err) {
      console.error('❌ Failed to delete user:', err);
    }
  }
});  

test("Verify user invite ,email and confirmationPage verification", async t => {

  // Create a temporary inbox
  inbox = await mailslurp.inboxController.createInboxWithDefaults();
  testEmail = inbox.emailAddress;
  console.log(`Temporary email created`);

    await userinvitationPage.invitenewUser(testEmail);
    await userinvitationPage.verifyuserInvitation(mailslurp, inbox, testEmail, process.env.ADMIN_EMAIL);
    await userinvitationPage.verifyconfirmationPage();
  
});