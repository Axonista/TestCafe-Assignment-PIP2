import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import loginPage from "./loginPage";
import dotenv from 'dotenv';
dotenv.config();


class Test1_userinvitationPage {
  constructor() {

    // Create New User Page
    this.accountsdropDown = XPathSelector("//button[@id='accountsDropdown']");
    this.selectAccount = XPathSelector("//*[contains(@aria-label,'Select account')]");
    this.confirmQAAccount = XPathSelector("//*[contains(@class,'item__title') and text()='QA Test Account']");
    this.accountName = XPathSelector("//div[@aria-label='User']");
    this.profile = XPathSelector("//*[text()='Profile']");
    this.plusButton = Selector("a[title='Invite User']");
    this.invitenewuserTitle = XPathSelector("//*[text()='Invite New User']");
    this.newuserEmail = XPathSelector("//*[contains (@class,'new__side__panel__content')]//*[@name='email']");
    this.saveButton = XPathSelector("//*[@class='new__side__panel__footer']/*[@class='pull-right']/button[2]");
    this.moreAction = XPathSelector("//button[@title='More actions']");
    this.deleteButton = XPathSelector("//li[@data-command='delete']");
    this.confirmdeleteCheckbox = XPathSelector("//input[@name='confirmDeletion']");
    this.confirmdeleteButton = XPathSelector("//*[contains (@class , 'btn-danger')]");
    this.confirmdeleteMessage = XPathSelector("//div[@class='DisplayMessage--text']");
    this.useremailinvite = XPathSelector("//*[@class='item-card__title']");
    this.usernameinvitestatus = XPathSelector("//*[@class='item-card__secondary']");

    //Confirmation page for Registring Ediflo
    this.confirmfirstName = XPathSelector("//input[@name='firstName']");
    this.confirmlastName = XPathSelector("//input[@name='lastName']");
    this.newPassword = XPathSelector("//input[@name='password']");
    this.confirmNewPassword = XPathSelector("//input[@name='confirmPassword']");
    this.confirmshowPassword = XPathSelector("//*[text()='Show password']");
    this.confirmsignUp = XPathSelector("//button[@type='submit']");

  }
  async invitenewUser(testEmail) {

    //Open the Invite New User page and send invitation
    await t.expect(this.accountName.exists).ok('Account Name is not displayed', { timeout: 10000 });
    await t.click(this.accountName);
    console.log('Account Name is clicked successfully');
    await t.expect(this.profile.exists).ok('Profile option is not displayed', { timeout: 5000 });
    await t.click(this.profile);
    console.log('Profile option is clicked successfully');
    await t.expect(this.plusButton.exists).ok('Invite New User icon is not dispalyed', { timeout: 5000 });
    await t.click(this.plusButton);
    console.log('Invite New user icon is clicked successfully');
    await t.expect(this.newuserEmail.exists).ok('Email field in Invite New User is not displayed', { timeout: 5000 });
    await t.typeText(this.newuserEmail, testEmail, { paste: true });
    console.log('User Email Address is entered successfully');
    await t.expect(this.saveButton.exists).ok('Save button is not displayed', { timeout: 5000 });
    await t.click(this.saveButton);
    console.log('Save button is clicked successfully');

    await t.eval(() => location.reload(true));
    await t.wait(3000);

    const count = await this.useremailinvite.count;
    let matchFound = false;

    for (let i = 0; i < count; i++) {
      const useremail = (await this.usernameinvite.nth(i).innerText).trim();
      const status = (await this.usernameinvitestatus.nth(i).innerText).trim();

      if (useremail === testEmail && status === 'INVITED') {
        await t
          .expect(useremail).eql(testEmail, `Username matched at index ${i}`)
          .expect(status).eql('INVITED', `Status matched at index ${i}`);
        matchFound = true;
        break;
      }
    }
    await t.expect(matchFound).ok(`No matching user found with email: ${testEmail} and status: INVITED`);
  }

  async verifyuserInvitation(mailslurp, inbox, testEmail) {
    // Wait for the invitation email
    console.log(`Waiting for email.`);
    const email = await mailslurp.waitForLatestEmail(inbox.id, 5000);
    console.log('The email is successfully received in inbox');

    // Verify Email Subject
    await t.expect(email.subject).contains("Ediflo Registration", 'Subject check failed', { timeout: 5000 });
    console.log('Subject in email is verified successfully');

    //Verify Email Body
    const actualemailBody = email.body;
    const expectedInviteeAddress = `Hi ${testEmail}`;
    const expectedInviteMessage = `${process.env.ADMIN_EMAIL} has invited you to join Ediflo.`;
    const expectedInstruction = 'To accept this invitation and register to your organisation’s Ediflo account, please follow the instructions below:';
    const expectedExpiryMessage = 'The invitation will expire within 3 days of this email being received. Please ignore this email if it was sent in error.';

    // Assertions to verify each line of the email body
    await t.expect(actualemailBody).contains(expectedInviteeAddress, 'Invitee address is not displayed correctly', { timeout: 5000 });
    console.log('Invitee address is displayed correctly');
    await t.expect(actualemailBody).contains(expectedInviteMessage, 'Invite Message is not displayed correctly', { timeout: 5000 });
    console.log('Invite message is displayed correctly');
    await t.expect(actualemailBody).contains(expectedInstruction, 'Instructions to accept invite and register are not displayed correctly', { timeout: 5000 });
    console.log('Instructions to accept invite and register are displayed correctly');
    await t.expect(actualemailBody).contains(expectedExpiryMessage, 'Expiry message of invitation is not displayed correctly', { timeout: 5000 });
    console.log('Expiry message of invitation is displayed correctly');

    // Verify the sender Email Address
    console.log('Sender:', email.from);
    await t.expect(email.from).eql(process.env.CONFIRMATION_EMAIL_SENDER, '❌ Sender email does not match expected', { timeout: 5000 });


    // Extract link from email body
    const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>Click Here to Accept the Invitation and Register<\/a>/i;
    const match = email.body.match(linkRegex);
    const confirmationLink = match ? match[1] : null;

    // Assert the link was found
    await t.expect(confirmationLink).ok('No confirmation link found in email', { timeout: 10000 });
    console.log('Email body is verified which contains link text - Click Here to Accept the Invitation and Register');

    // ✅ Open the confirmation link
    await t.navigateTo(confirmationLink);
    console.log('Navigation to Confirmation page is successfully');

  }

  async verifyconfirmationPage() {
    // Confirmation page is loaded correctly with all elements visible for creating a new user.
    await t.expect(this.confirmfirstName.visible).ok('First name field is not displayed');
    console.log('First Name is displayed successfully');
    await t.expect(this.confirmlastName.visible).ok('Last name field is not displayed');
    console.log('Last Name is displayed successfully');
    await t.expect(this.newPassword.visible).ok('New Password field is not displayed');
    console.log('New Password field is displayed successfully');
    await t.expect(this.confirmNewPassword.visible).ok('Confirm New Password field is not displayed');
    console.log('Confirm New Password field is displayed successfully');
    await t.expect(this.confirmshowPassword.visible).ok('Show Password text is not displayed');
    console.log('Show Password text is displayed successfully');
    await t.expect(this.confirmsignUp.visible).ok('Sign Up button is not displayed');
    console.log('Sign Up button is displayed successfully');
    console.log('Confirmation page is verified successfully');
  }


  async deleteInbox(mailslurp, inbox) {
    //Delete the email after verifications
    await mailslurp.deleteInbox(inbox.id);
    console.log('Inbox Email is deleted successfully');
  }


  async deleteUser(testEmail) {

    await t.expect(this.accountName.exists).ok('Account Name is not displayed', { timeout: 10000 });
    console.log('Account Name is displayed successfully');
    await t.click(this.accountName);
    console.log('Account Name is displayed successfully');
    await t.expect(this.profile.exists).ok('Account Name is not displayed', { timeout: 5000 });
    console.log('Profile Option is displayed successfully');
    await t.click(this.profile);
    console.log('Profile Option is clicked successfully');

    const useremailElement = XPathSelector(`//h4[@class='item-card__title' and text()='${testEmail}']`);
    await t.expect(useremailElement.exists).ok(`Email ${testEmail} not found in user list`, { timeout: 5000 });
    await t.click(useremailElement);

    console.log('User email is entered on User page successfully');
    await t.expect(this.moreAction.exists).ok(`More action option is not clicked `, { timeout: 5000 });
    await t.click(this.moreAction);
    console.log('More action option is clicked successfully');
    await t.expect(this.deleteButton.exists).ok(`Delete button is not clicked`, { timeout: 5000 });
    await t.click(this.deleteButton);
    console.log('Delete button is clicked successfully');
    await t.expect(this.confirmdeleteCheckbox.exists).ok(`Confirm delete checkbox is not clicked`, { timeout: 5000 });
    await t.click(this.confirmdeleteCheckbox);
    console.log('Confirm delete checkbox is clicked successfully');
    await t.expect(this.confirmdeleteButton.exists).ok(`Confirm delete button is not clicked`, { timeout: 20000 });
    await t.click(this.confirmdeleteButton);
    console.log('Confirm delete button is clicked successfully');
    await t.expect(this.confirmdeleteMessage.exists).ok(`Confirm delete message is not displayed`, { timeout: 5000 });
    console.log('Confirm delete message is displayed successfully');

  }
}

export default new Test1_userinvitationPage();
