import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';


class loginPage {
  constructor() {

    //Open QA Test Account
    this.accountsdropDown = XPathSelector("//button[@id='accountsDropdown']");
    this.selectAccount = XPathSelector("//*[text()='QA Test Account']");

    // Login Selectors
    this.emailField = Selector("input[name='username']");
    this.passwordField = Selector("input[name='password']");
    this.signInButton = Selector("button[type='submit']");
  }

  async login(email, password) {
    await t.expect(this.emailField.exists).ok({ timeout: 10000 });
    await t.typeText(this.emailField, email, { paste: true });
    console.log('Email is entered successfully');
    await t.expect(this.passwordField.exists).ok({ timeout: 10000 });
    await t.typeText(this.passwordField, password, { paste: true });
    console.log('Password is entered successfully');
    await t.expect(this.signInButton.exists).ok({ timeout: 10000 });
    await t.click(this.signInButton);
    console.log('Sign in button is clicked successfully');
    await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
    await t.click(this.accountsdropDown);
    console.log('Account dropdown is clicked successfully');
    await t.expect(this.selectAccount.exists).ok({ timeout: 10000 });
    await t.click(this.selectAccount);
    console.log('Account is selected successfully');

  }
}
export default new loginPage();
