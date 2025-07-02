import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';


class loginPage {
  constructor() {

    //Xpath of elements
    this.emailField = Selector("input[name='username']");
    this.passwordField = Selector("input[name='password']");
    this.signInButton = Selector("button[type='submit']");
    this.accountsdropDown = XPathSelector("//button[@id='accountsDropdown']");
    this.selectQAAccount = XPathSelector("//*[contains(@class,'item__title') and text()='QA Test Account']");
    this.confirmQAAccount = XPathSelector("//*[@title='QA Test Account']");
    this.assetsTab = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
    this.seriesTab = XPathSelector("//*[contains(@href, 'series') and text()='Series']");
    this.collectionTab = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
    this.selectTexasRangerAccount = XPathSelector("//*[contains(@class,'item__title') and text()='Texas Rangers']");
    this.confirmTexasRangerAccount = XPathSelector("//*[@title='Texas Rangers']");
  }

  async login(email, password) {

    //Login with user email and password
    await t.expect(this.emailField.exists).ok({ timeout: 10000 });
    await t.typeText(this.emailField, email, { paste: true });
    console.log('Email is entered successfully');
    await t.expect(this.passwordField.exists).ok({ timeout: 10000 });
    await t.typeText(this.passwordField, password, { paste: true });
    console.log('Password is entered successfully');
    await t.expect(this.signInButton.exists).ok({ timeout: 10000 });
    await t.click(this.signInButton);
    console.log('Sign in button is clicked successfully');
  }


  async selectAccount(accountName) {

  //Select QA Test Account  
  await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
  await t.click(this.accountsdropDown);
  console.log('Account dropdown is clicked successfully');

  const accountOption = XPathSelector(`//*[contains(@class,'item__title') and text()='${accountName}']`);
  const confirmAccount = XPathSelector(`//*[@title='${accountName}']`);

  await t.expect(accountOption.exists).ok({ timeout: 10000 });
  await t.click(accountOption);
  await t.expect(confirmAccount.innerText).eql(accountName, `${accountName} is not selected`, { timeout: 10000 });
  console.log(`${accountName} is selected successfully`);
}

  async selectAssetsTab() {

    //Select Assets tab
    await t.expect(this.assetsTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.assetsTab);
    await t.expect(this.assetsTab.innerText).eql('Assets', 'Assets tab is not selected', { timeout: 10000 });
    console.log('Asset tab is displayed successfully');
  }

  async selectSeriesTab() {

    //Select Series tab
    await t.expect(this.seriesTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.seriesTab);
    await t.expect(this.seriesTab.innerText).eql('Series', 'Series tab is not displayed', { timeout: 10000 });
    console.log('Series tab is displayed successfully');
  }

  async selectCollectionsTab() {

    //Select Collections tab
    await t.expect(this.collectionTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.collectionTab);
    await t.expect(this.collectionTab.innerText).eql('Collections', 'Collections tab is not displayed', { timeout: 10000 });
    console.log('Collections tab is displayed successfully');
  }
}

export default new loginPage();
