import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
console.log("MAILSLURP_API_KEY:", process.env.MAILSLURP_API_KEY);


class userinvitationPage {
  constructor() {
    // Login Selectors
    this.emailField = Selector("input[name='username']");
    this.passwordField = Selector("input[name='password']");
    this.signInButton = Selector("button[type='submit']");

    // Create New User Page
    this.accountName = XPathSelector("//div[@aria-label='User']");
    this.profile = XPathSelector("//*[text()='Profile']");
    this.plusButton = Selector("a[title='Invite User']");
    this.invitenewuserTitle = XPathSelector("//*[text()='Invite New User']");
    this.newuserEmail = XPathSelector("//*[contains (@class,'new__side__panel__content')]//*[@name='email']");
    this.saveButton = XPathSelector("//*[@class='new__side__panel__footer']/*[@class='pull-right']/button[2]");
  }

  async login(email, password) {
    await t.typeText(this.emailField, email, { paste: true })
      await t.typeText(this.passwordField, password, { paste: true })
      await t.click(this.signInButton)
      await t.wait(3000);
  }

    async verifyuserInvitation() {
    // 1. Create a temporary inbox
    const inbox = await mailslurp.inboxController.createInboxWithDefaults();
    const testEmail = inbox.emailAddress;
    console.log(`Temporary email created: ${testEmail}`);

 
await t.click(this.accountName)
  await t.click(this.profile)
  await t.click(this.plusButton)
  await t.wait(5000);
  await t.expect(this.invitenewuserTitle.exists).ok();
await t.expect(this.invitenewuserTitle.visible).ok()
await t.click(this.newuserEmail)
await t.wait(5000)


// now type safely
await t.typeText(this.newuserEmail, testEmail, { paste: true })
await t.wait(5000)


    // 🟩 Safe click when ready
      await t.expect(this.saveButton.visible).ok()
      await t.click(this.saveButton);

    // 3. Wait for the invitation email
    console.log(`Waiting for email at ${testEmail}...`);
    const email = await mailslurp.waitForLatestEmail(inbox.id, 5000); // ⏱️ Increased timeout

    // 4. Assertions
    await t.expect(email.subject).contains("Ediflo Registration", 'Subject check failed')

  // Match anchor tag specifically containing the expected link text
const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>Click Here to Accept the Invitation and Register<\/a>/i;

// Try matching it from the HTML email body
const match = email.body.match(linkRegex);
const confirmationLink = match ? match[1] : null;

// Assert the link was found
await t.expect(confirmationLink).ok('No confirmation link found in email');

// ✅ Open the confirmation link (even if it's meant to open in a new tab)
await t.navigateTo(confirmationLink);






    // 🧪 Optional: Debug or screenshot if issues persist
    // await t.debug();
    // await t.takeScreenshot();

    // 8. Cleanup (optional)
    // await mailslurp.deleteInbox(inbox.id);
  }
}

export default new userinvitationPage();
