import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector.js';
import { MailSlurp } from 'mailslurp-client';
import userinvitationPage from '../page/userinvitationPage.js';
import loginPage from '../page/loginPage.js';
import dotenv from 'dotenv';
dotenv.config();

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
console.log("MAILSLURP_API_KEY:", process.env.MAILSLURP_API_KEY);

fixture('Validate User invitation flow')
  .page(process.env.STAGING_URL + "")
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await loginPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  });

test("Verify User Invite Sent,User Email Verified and User Deletion successfully", async t => {

  // Create a temporary inbox
  const inbox = await mailslurp.inboxController.createInboxWithDefaults();
  const testEmail = inbox.emailAddress;
  const inviterEmail = process.env.ADMIN_EMAIL;
  console.log(`Temporary email created`);

  try {
    await userinvitationPage.invitenewUser(testEmail);
    await userinvitationPage.verifyuserInvitation(mailslurp, inbox, testEmail, process.env.ADMIN_EMAIL);
  } catch (err) {
    console.error('❌ Test failed:', err);
    throw err;
  } finally {
     //Delete Test Inbox from Ediflo
     await userinvitationPage.deleteInbox(mailslurp, inbox);

     //Delete Test Inbox from Ediflo
    console.log('Navigating to Staging URL to Delete the User Created');
    await t.navigateTo(process.env.STAGING_URL);
    await userinvitationPage.deleteUser(testEmail);

  }
});


