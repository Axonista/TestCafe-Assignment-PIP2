import XPathSelector from '../helpers/xpath-selector';
import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import dotenv from 'dotenv';
dotenv.config();


class globalhistoryPage {
  constructor() {
    // Login Selectors
    this.accountsdropDown = XPathSelector("//button[@id='accountsDropdown']");
    this.assetsTab = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
    this.selectQAAccount = XPathSelector("//*[contains(@class,'item__title') and text()='QA Test Account']");
    this.confirmQAAccount = XPathSelector("//*[@title='QA Test Account']");
    this.seriesTab = XPathSelector("//*[contains(@href, 'series') and text()='Series']");
    this.collectionTab = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
    this.plusicon = XPathSelector("//*[contains (@class,'--create')]//*[@class='material-icons']");
    this.searchResult = XPathSelector("//*[contains(@class,'card__title')]");
    this.title = XPathSelector("//*[contains(@class,'side__panel')]//*[@name='title']");
    this.synopsis = XPathSelector("//*[contains (@class,'side__panel')]//*[@name='synopsis']");
    this.collectionDescription = XPathSelector("//*[contains (@class,'side__panel')]//*[@name='description']");
    this.collectionMetadata = XPathSelector("//*[@data-identifier='metadata']");
    this.editSynopsis = XPathSelector("//*[contains(@class,'group-content')]//*[@name='synopsis']");
    this.editDescription = XPathSelector("//*[contains(@class,'group-content')]//*[@name='description']");
    this.saveButton = XPathSelector("//*[contains(@class,'side__panel')]//*[text()='Save']");
    this.alertMessage = XPathSelector("//*[contains(@class,'message-inner')]");
    this.editsaveButton = XPathSelector("//*[@class='pull-right']//*[text()='Save']");
    this.searchBox = XPathSelector("//*[contains(@class,'searchBox')]");
    this.moreAction = XPathSelector("//*[contains(@class,'header__actions')]//*[@title='More actions']");
    this.deleteButton = XPathSelector("//*[contains(@class,'tmp__header')]//*[@data-command='delete']");
    this.collectiondeleteButton = XPathSelector("//*[text()='Delete collection']");
    this.confirmdelete = XPathSelector("//*[contains(@class , 'btn-danger')]");
  }

  async selectAccount(){

    await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
    await t.click(this.accountsdropDown);
    console.log('Account dropdown is clicked successfully');
    await t.expect(this.selectQAAccount.exists).ok({ timeout: 10000 });
    await t.click(this.selectQAAccount);
    await t.expect(this.confirmQAAccount.exists).ok('QA Test account is not selected', { timeout: 10000 });
    console.log('QA Account is selected successfully');
  }

  async addAsset(title, synopsis) {

    await t.expect(this.assetsTab.visible).ok('Asset section is not displayed', { timeout: 10000 });
    await t.click(this.assetsTab);
    console.log('Asset section is displayed successfully');
    await t.expect(this.plusicon.visible).ok('Add Asset icon is not displayed', { timeout: 10000 });
    await t.click(this.plusicon);
    console.log('Add Asset icon  is displayed successfully');
    await t.expect(this.title.visible).ok('Asset title is not displayed', { timeout: 10000 });
    await t.typeText(this.title, title, { paste: true });
    console.log('Asset title is entered successfully');
    await t.expect(this.synopsis.visible).ok('Asset synopsis is not displayed', { timeout: 10000 });
    await t.typeText(this.synopsis, synopsis, { paste: true });
    console.log('Asset description is entered successfully');
    await t.expect(this.saveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.saveButton);
    console.log('Save button is clicked successfully');
    
    const getPageUrl = ClientFunction(() => window.location.href);
    this.pageURL = await getPageUrl();
    // ✅ Extract Asset ID from the URL
    this.assetId = this.pageURL.split('/assets/')[1].split('/metadata')[0];
    console.log('Extracted Asset ID:', this.assetId);
    await t.typeText(this.searchBox, `id:${this.assetId}`, { paste: true });
    await t.expect(this.searchResult.visible).ok('Search result is not displayed' , {timeout : 10000});
    await t.expect(this.searchResult.innerText).eql(title , 'Correct Asset is not displayed');
    console.log('Correct Asset is displayed successfully');
    await t.click(this.searchResult);
    console.log('Correct asset is clicked successfully');

  }

  async addSeries(title, synopsis) {

    await t.expect(this.seriesTab.visible).ok('Series section is not displayed', { timeout: 10000 });
    await t.click(this.seriesTab);
    console.log('Series section is displayed successfully');
    await t.expect(this.plusicon.visible).ok('Series icon is not displayed', { timeout: 10000 });
    await t.click(this.plusicon);
    console.log('Add Series icon  is displayed successfully');
    await t.expect(this.title.visible).ok('Series title is not displayed', { timeout: 10000 });
    await t.typeText(this.title, title, { paste: true });
    console.log('Series title is entered successfully');
    await t.expect(this.synopsis.visible).ok('Series synopsis is not displayed', { timeout: 10000 });
    await t.typeText(this.synopsis, synopsis, { paste: true });
    console.log('Series description is entered successfully');
    await t.expect(this.saveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.saveButton);
    console.log('Save button is clicked successfully');
    
    const getPageUrl = ClientFunction(() => window.location.href);
    this.pageURL = await getPageUrl();
    // ✅ Extract Series ID from the URL
    this.seriesId = this.pageURL.split('/series/')[1].split('/metadata')[0];
    console.log('Extracted Series ID:', this.seriesId);
    await t.typeText(this.searchBox, `id:${this.seriesId}`, { paste: true });
    await t.expect(this.searchResult.visible).ok('Search result is not displayed' , {timeout : 10000});
    await t.expect(this.searchResult.innerText).eql(title , 'Correct Series is not displayed');
    console.log('Correct Series is displayed successfully');
    await t.click(this.searchResult);
    console.log('Correct series is clicked successfully');
  }

  async addCollection(title, synopsis) {

    await t.expect(this.collectionTab.visible).ok('Collection section is not displayed', { timeout: 10000 });
    await t.click(this.collectionTab);
    console.log('Collection section is displayed successfully');
    await t.expect(this.plusicon.visible).ok('Add Collection icon is not displayed', { timeout: 10000 });
    await t.click(this.plusicon);
    console.log('Add Collection icon  is displayed successfully');
    await t.expect(this.title.visible).ok('Collection title is not displayed', { timeout: 10000 });
    await t.typeText(this.title, title, { paste: true });
    console.log('Collection title is entered successfully');
    await t.expect(this.collectionDescription.visible).ok('Collection description is not displayed', { timeout: 10000 });
    await t.typeText(this.collectionDescription, synopsis, { paste: true });
    console.log('Collection description is entered successfully');
    await t.expect(this.saveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.saveButton);
    console.log('Save button is clicked successfully');
    
    const getPageUrl = ClientFunction(() => window.location.href);
    this.pageURL = await getPageUrl();
    console.log('Collection is created successfully');
    // ✅ Extract collection name from the URL
    this.collectionCode = this.pageURL.split('/collections/')[1].split('/')[0];
    console.log('Extracted Collection Name:', this.collectionCode);
    await t.typeText(this.searchBox, this.collectionCode, { paste: true });
    await t.expect(this.searchResult.visible).ok('Search result is not displayed' , {timeout : 10000});
    await t.expect(this.searchResult.innerText).eql(title , 'Correct Collection is not displayed');
    console.log('Correct Collection is displayed successfully');
    await t.click(this.searchResult);
    console.log('Correct collection is clicked successfully');
  }

  async editAsset(newSynopsis) {

    await t.expect(this.editSynopsis.visible).ok('Asset description is not displayed', { timeout: 10000 });
    await t.typeText(this.editSynopsis, newSynopsis, { replace: true });
    console.log('Asset description is edited successfully');
    await t.expect(this.editsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.editsaveButton);
    console.log('Save button is clicked successfully');
    await t.expect(this.editSynopsis.value).eql(newSynopsis , 'Edited description is not saved');
    console.log('Edited descrtion is saved successfully');
  }

   async editSeries(newSynopsis) {

    await t.expect(this.editSynopsis.visible).ok('Series description is not displayed', { timeout: 10000 });
    await t.typeText(this.editSynopsis, newSynopsis, { replace: true });
    console.log('Series description is edited successfully');
    await t.expect(this.editsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.editsaveButton);
    console.log('Save button is clicked successfully');
    await t.expect(this.editSynopsis.value).eql(newSynopsis , 'Edited description is not saved');
    console.log('Edited descrtion is saved successfully');
  }

  async editCollection(newSynopsis) {

    await t.expect(this.collectionMetadata.visible).ok('Collection metadata is not displayed', { timeout: 10000 });
    await t.click(this.collectionMetadata);
    console.log('Collection metadata is clicked successfully');
    await t.expect(this.editDescription.visible).ok('Collection description is not displayed', { timeout: 10000 });
    await t.typeText(this.editDescription, newSynopsis, { replace: true });
    console.log('Collection description is edited successfully');
    await t.expect(this.editsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.editsaveButton);
    console.log('Save button is clicked successfully');
    await t.expect(this.editDescription.value).eql(newSynopsis , 'Edited description is not saved');
    console.log('Edited descrtion is saved successfully');
  }

  async deleteAsset(title) {
    
    await t.expect(this.assetsTab.visible).ok('Asset tab is not displayed', { timeout: 10000 });
    await t.click(this.assetsTab);
    console.log('Asset tab is displayed successfully');
    await t.typeText(this.searchBox, `id:${this.assetId}`, { paste: true });
    await t.expect(this.searchResult.innerText).eql(title , 'Search Result is not same as title' , {timeout: 10000});
    await t.click(this.searchResult);
    console.log('Navigated to the asset page before deletion');
    await t.expect(this.moreAction.visible).ok('More actions not visible', { timeout: 10000 });
    await t.click(this.moreAction);
    console.log('More action button is clicked successfully');
    await t.expect(this.deleteButton.visible).ok('Delete button not visible', { timeout: 10000 });
    await t.click(this.deleteButton);
    console.log('Delete button is clicked successfully');
    await t.expect(this.confirmdelete.visible).ok('Confirm delete not visible', { timeout: 10000 });
    await t.click(this.confirmdelete);
    await t.typeText(this.searchBox, `id:${this.assetId}`, { replace: true });
    await t.expect(this.searchResult.exists).notOk('Search result asset is displayed', { timeout: 10000 });
    console.log('Asset is deleted successfully');

    
  }

  async deleteSeries(title) {
    
    await t.expect(this.seriesTab.visible).ok('Series tab is not displayed', { timeout: 10000 });
    await t.click(this.seriesTab);
    console.log('Series tab is clicked successfully');
    await t.typeText(this.searchBox, `id:${this.seriesId}`, { paste: true });
    await t.expect(this.searchResult.innerText).eql(title , 'Search Result is not same as title' , {timeout:10000});
    await t.click(this.searchResult);
    console.log('Navigated to the series page before deletion');
    await t.expect(this.moreAction.visible).ok('More actions not visible', { timeout: 10000 });
    await t.click(this.moreAction);
    console.log('More action button is clicked successfully');
    await t.expect(this.deleteButton.visible).ok('Delete button not visible', { timeout: 10000 });
    await t.click(this.deleteButton);
    console.log('Delete button is clicked successfully');
    await t.expect(this.confirmdelete.visible).ok('Confirm delete not visible', { timeout: 10000 });
    await t.click(this.confirmdelete);
    await t.typeText(this.searchBox, `id:${this.seriesId}`, { replace: true });
    await t.expect(this.searchResult.exists).notOk('Search result asset is displayed', { timeout: 10000 });
    console.log('Asset is deleted successfully');
  }

  async deleteCollection(title) {
    
    await t.expect(this.collectionTab.visible).ok('Collection tab is not displayed', { timeout: 10000 });
    await t.click(this.collectionTab);
    console.log('Collection tab is clicked successfully');
    await t.typeText(this.searchBox, this.collectionCode, { paste: true });
    await t.expect(this.searchResult.innerText).eql(title , 'Search Result is not same as title' , {timeout:10000});
    await t.click(this.searchResult);
    console.log('Navigated to the series page before deletion');
    await t.expect(this.moreAction.visible).ok('More actions not visible', { timeout: 10000 });
    await t.click(this.moreAction);
    console.log('More action button is clicked successfully');
    await t.expect(this.collectiondeleteButton.visible).ok('Delete button not visible', { timeout: 10000 });
    await t.click(this.collectiondeleteButton);
    console.log('Delete button is clicked successfully');
    await t.expect(this.confirmdelete.visible).ok('Confirm delete not visible', { timeout: 10000 });
    await t.click(this.confirmdelete);
    await t.typeText(this.searchBox, this.collectionCode, { replace: true });
    await t.expect(this.searchResult.exists).notOk('Search result collection is displayed', { timeout: 10000 });
    console.log('Collection is deleted successfully');
    
  }
  
}

export default new globalhistoryPage();
