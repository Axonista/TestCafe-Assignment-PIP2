import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import { Selector, t } from 'testcafe';

class assetPage {
  constructor() {
    // Login Selectors
    this.assetsSection = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
    this.seriesSection = XPathSelector("//*[contains(@href, 'series') and text()='Series']");
    this.collectionSection = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
    this.plusicononAsset = XPathSelector("//*[contains (@class,'--create')]//*[@class='material-icons']");
    this.addTitle = XPathSelector("//*[contains (@class,'side__panel')]//*[@name='title']");
    this.addSynopsis = XPathSelector("//*[contains (@class,'side__panel')]//*[@name='synopsis']");
    this.editSynopsis = XPathSelector("//*[contains (@class,'group-content')]//*[@name='synopsis']");
    this.addsaveButton = XPathSelector("//*[contains (@class,'side__panel')]//*[text()='Save']");
    this.editsaveButton = XPathSelector("//*[@class='pull-right']//*[text()='Save']");
    this.searchBox = XPathSelector("//*[contains(@class,'searchBox')]");
    this.alertMessage = XPathSelector("//*[contains(@class , 'message-inner')]");
    this.moreAction = XPathSelector("//*[contains(@class,'header__actions')]//*[@title='More actions']");
    this.deleteButton = XPathSelector("//*[@class='tmp__header']//*[contains(@data-command, 'delete')]");
    this.confirmdeleteButton = XPathSelector("//*[contains (@class , 'btn-danger')]");
    
  }

    getSectionSelector(type) {
  switch (type.toLowerCase()) {
    case 'assets':
      return this.assetsSection;
    case 'series':
      return this.seriesSection;
    case 'collection':
      return this.collectionSection;
    default:
      throw new Error(`Unknown section type: ${type}`);
  }
}
  async addTest(title, synopsis , type) {

    const sectionSelector = this.getSectionSelector(type);
    await t.expect(sectionSelector.visible).ok(`"${type}" section is not displayed`, { timeout: 10000 });
    await t.click(sectionSelector);
    console.log(`"${type}" section is displayed successfully`);
    await t.expect(this.plusicononAsset.visible).ok(`Add "${type}" icon is not displayed`, { timeout: 10000 });
    await t.click(this.plusicononAsset);
    console.log(`Add "${type}" icon  is displayed successfully`);
    await t.expect(this.addTitle.visible).ok(`"${type}" title is not displayed`, { timeout: 10000 });
    await t.typeText(this.addTitle, title, { paste: true });
    console.log(`"${type}" title is entered successfully`);
    await t.expect(this.addSynopsis.visible).ok(`"${type}" description is not displayed`, { timeout: 10000 });
    await t.typeText(this.addSynopsis, synopsis, { paste: true });
    console.log(`"${type}" description is entered successfully`);
    await t.expect(this.addsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.addsaveButton);
    console.log('Save button is clicked successfully');
    //await t.expect(this.alertMessage.visible).ok(`New "${type}" created confirmation message is not displayed`, { timeout: 10000 });
    //await t.expect(this.alertMessage.innerText).contains(`${type} "${title}" saved`, `New "${type}" created confirmation message is not displayed`, { timeout: 10000 });
    //console.log(`"${type}" saved confirmation message validated successfully`);

  }

  async editTest(newSynopsis, title , type) {

    await t.expect(this.editSynopsis.visible).ok(`"${type}" description is not displayed`, { timeout: 10000 });
    await t.typeText(this.editSynopsis, newSynopsis, { replace: true });
    console.log(`"${type}" description is edited successfully`);
    await t.expect(this.editsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.editsaveButton);
    console.log('Save button is clicked successfully');
    //await t.expect(this.alertMessage.innerText).contains(`${type} "${title}" saved`, 'Asset Edited confirmation message is not displayed', { timeout: 10000 });
    //console.log('Alert message is displayed successfully');
  
  }
  async deleteTest(title , type) {

    const sectionSelector = this.getSectionSelector(type);
    await t.expect(sectionSelector.visible).ok(`"${type}" section not visible`, { timeout: 10000 });
    await t.click(sectionSelector);
    console.log(`"${type}"is clicked successfully`);
    await t.expect(this.searchBox.visible).ok('Search box not visible', { timeout: 10000 });
    await t.typeText(this.searchBox, title, { replace: true });
    await t.pressKey('enter');
    console.log('Search box is entered successfully');
    const searchAsset = XPathSelector(`//*[contains(@class,'title') and text()="${title}"]`);
    await t.expect(searchAsset.exists).ok(`"${type}" with title "${title}" not found`, { timeout: 10000 });
    await t.click(searchAsset);
    console.log(`"${type}" "${title}" is clicked successfully`);
    await t.expect(this.moreAction.visible).ok('More actions not visible', { timeout: 10000 });
    await t.click(this.moreAction);
    console.log('More action button is clicked successfully');
    await t.expect(this.deleteButton.visible).ok('Delete button not visible', { timeout: 10000 });
    await t.click(this.deleteButton);
    console.log('Delete button is clicked successfully');
    await t.expect(this.confirmdeleteButton.visible).ok('Confirm delete not visible', { timeout: 10000 });
    await t.click(this.confirmdeleteButton);
    console.log(`"${title}" is deleted successfully`);
  }
}

export default new assetPage();
