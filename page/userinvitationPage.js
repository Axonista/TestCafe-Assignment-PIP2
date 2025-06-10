import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';


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
  

  //Confirmation page for Registring Ediflo
  this.confirmfirstName = XPathSelector("//input[@name='firstName']");
  this.confirmlastName = XPathSelector("//input[@name='lastName']");
  this.newPassword = XPathSelector("//input[@name='password']");
  this.confirmNewPassword = XPathSelector("//input[@name='confirmPassword']");
  this.confirmshowPassword = XPathSelector("//*[text()='Show password']");
  this.confirmsignUp = XPathSelector("//button[@type='submit']");

  }

  async login(email, password) {
      await t.typeText(this.emailField, email, { paste: true });
      console.log('Email is entered successfully');
      await t.typeText(this.passwordField, password, { paste: true });
      console.log('Password is entered successfully');
      await t.click(this.signInButton);
      console.log('Sign in button is clicked successfully');
      await t.wait(5000);
  }


    async invitenewUser(testEmail) {
     
   //Open the Invite New User page and send invitation
  await t.click(this.accountName);
  console.log('Account Name is clicked successfully');
  await t.click(this.profile);
  console.log('Profile option is clicked successfully');
  await t.click(this.plusButton);
  console.log('Invite New user icon is clicked successfully');
  await t.wait(5000);
  await t.expect(this.invitenewuserTitle.exists).ok();
  await t.expect(this.invitenewuserTitle.visible).ok();
  await t.wait(5000);
  await t.typeText(this.newuserEmail, testEmail, { paste: true });
  console.log('User Email Address is entered successfully');
  await t.wait(5000);
  await t.expect(this.saveButton.visible).ok();
  await t.click(this.saveButton);
  console.log('Save button is clicked successfully');

  }

async verifyuserInvitation(mailslurp, inbox, testEmail , inviterEmail) { 
    // Wait for the invitation email
    console.log(`Waiting for email at ${testEmail}...`);
    const email = await mailslurp.waitForLatestEmail(inbox.id, 5000); 
    console.log('The email is successfully received in inbox');

    await t.expect(email.subject).contains("Ediflo Registration", 'Subject check failed');
    console.log('Subject in email is verified successfully');

    // Verify the sender
    console.log('Sender:', email.from); // For debug

    await t.expect(email.from).eql(process.env.CONFIRMATION_EMAIL_SENDER , '❌ Sender email does not match expected');

    // Extract link from email body
    const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>Click Here to Accept the Invitation and Register<\/a>/i;
    const match = email.body.match(linkRegex);
    const confirmationLink = match ? match[1] : null;

    // Assert the link was found
    await t.expect(confirmationLink).ok('No confirmation link found in email');
    console.log('Email body is verified which contains link text - Click Here to Accept the Invitation and Register');

    // ✅ Open the confirmation link
    await t.navigateTo(confirmationLink);
    console.log('Navigation to Confirmation page is successfully');
    await t.wait(8000);

}

async verifyconfirmationPage() {

    // Confirmation page is loaded correctly with all elements visible for creating a new user.
    await t.expect(this.confirmfirstName.visible).ok('First name field is not displayed');
    console.log('First Name is displayed successfully');
    await t.expect(this.confirmlastName.visible).ok('Last name field is not displayed');
    console.log('Last Name is displayed  successfully');
    await t.expect(this.newPassword.visible).ok('New Password field is not displayed');
    console.log('New Password field is displayed successfully');
    await t.expect(this.confirmNewPassword.visible).ok('Confirm New Password field is not displayed');
    console.log('Confirm New Password field is displayed  successfully');
    await t.expect(this.confirmshowPassword.visible).ok('Show Password text is not displayed');
    console.log('Show Password text is displayed  successfully');
    await t.expect(this.confirmsignUp.visible).ok('Sign Up button is not displayed');
    console.log('Sign Up button is displayed  successfully');

    console.log('Confirmation page is verified successfully');

}

    async deleteInbox(mailslurp , inbox) {

   //Delete the email after verifications
    await mailslurp.deleteInbox(inbox.id);
    console.log('Inbox Email is deleted successfully');
    }
  }


export default new userinvitationPage();
