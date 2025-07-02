import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';


class loginPage {
  constructor() {

    // Login Selectors
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

  async selectQATestAccount() {

    await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
    await t.click(this.accountsdropDown);
    console.log('Account dropdown is clicked successfully');
    await t.expect(this.selectQAAccount.exists).ok({ timeout: 10000 });
    await t.click(this.selectQAAccount);
    await t.expect(this.confirmQAAccount.innerText).eql('QA Test Account', 'QA Test Account is not selected', { timeout: 10000 });
    console.log('QA Test Account is selected successfully');
  }

  async selectTexasRangersAccount() {
    await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
    await t.click(this.accountsdropDown);
    console.log('Account dropdown is clicked successfully');
    await t.expect(this.selectTexasRangerAccount.exists).ok({ timeout: 10000 });
    await t.click(this.selectTexasRangerAccount);
    await t.expect(this.confirmTexasRangerAccount.innerText).eql('Texas Rangers','Texas Ranger  not is selected', { timeout: 10000 });
    console.log('Texas Ranger is selected successfully');
  }

  async selectAssetsTab() {
    await t.expect(this.assetsTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.assetsTab);
    await t.expect(this.assetsTab.innerText).eql('Assets', 'Assets tab is not selected', { timeout: 10000 });
    console.log('Asset tab is displayed successfully');
  }

  async selectSeriesTab() {
    await t.expect(this.seriesTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.seriesTab);
    await t.expect(this.seriesTab.innerText).eql('Series', 'Series tab is not displayed', { timeout: 10000 });
    console.log('Series tab is displayed successfully');
  }

  async selectCollectionsTab() {
    await t.expect(this.collectionTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.collectionTab);
    await t.expect(this.collectionTab.innerText).eql('Collections', 'Collections tab is not displayed', { timeout: 10000 });
    console.log('Collections tab is displayed successfully');
  }
}

export default new loginPage();
