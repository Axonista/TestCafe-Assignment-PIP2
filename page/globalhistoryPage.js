import XPathSelector from '../helpers/xpath-selector';
import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();


class globalhistoryPage {
  constructor() {
    // Login Selectors
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

    //Global history Selectors
    this.accountName = XPathSelector("//div[@aria-label='User']");
    this.globalHistory = XPathSelector("//*[text()='Global History']");
    this.selectObject = XPathSelector("//div[contains(@class,'19bb58m')]");
    this.filter = XPathSelector("//*[@title='Filter']");
    this.userradioButton = XPathSelector("//*[@value='user']");
    this.searchUser = Selector('.Select__control input').nth(1);
    this.userResult = XPathSelector("//*[contains(@class,'Select__menu-list')]//*[contains(@class,'Select__option')]");
    this.searchButton = XPathSelector("//*[@type='submit']");
    this.objectList = XPathSelector("//*[@class='history__table']//tbody/tr/td[3]");
    this.objectDropdown = XPathSelector("//*[contains(@class,'Select__menu-list')]//*[contains(@class,'Select__option')]");
    this.assetList = XPathSelector("//div[contains(@class,'item-card')]");
    this.assetnameListGHPage = XPathSelector("//*[@class='item-card__title']");
    this.usernameListGHPage = XPathSelector("//*[@class='user-tag__email']");
    this.timestampListGHPage = XPathSelector("//*[@class='history__table']//tbody/tr/td[5]");
  }

  async addAsset(title, synopsis) {

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
    await t.expect(this.searchResult.visible).ok('Search result is not displayed', { timeout: 10000 });
    await t.expect(this.searchResult.innerText).eql(title, 'Correct Asset is not displayed');
    console.log('Correct Asset is displayed successfully');
    await t.click(this.searchResult);
    console.log('Correct asset is clicked successfully');

  }

  async addSeries(title, synopsis) {

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
    await t.expect(this.searchResult.visible).ok('Search result is not displayed', { timeout: 10000 });
    await t.expect(this.searchResult.innerText).eql(title, 'Correct Series is not displayed');
    console.log('Correct Series is displayed successfully');
    await t.click(this.searchResult);
    console.log('Correct series is clicked successfully');
  }

  async addCollection(title, synopsis) {

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
    await t.expect(this.searchResult.visible).ok('Search result is not displayed', { timeout: 10000 });
    await t.expect(this.searchResult.innerText).eql(title, 'Correct Collection is not displayed');
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
    await t.expect(this.editSynopsis.value).eql(newSynopsis, 'Edited description is not saved');
    console.log('Edited descrtion is saved successfully');
  }

  async editSeries(newSynopsis) {

    await t.expect(this.editSynopsis.visible).ok('Series description is not displayed', { timeout: 10000 });
    await t.typeText(this.editSynopsis, newSynopsis, { replace: true });
    console.log('Series description is edited successfully');
    await t.expect(this.editsaveButton.visible).ok('Save button is not displayed', { timeout: 10000 });
    await t.click(this.editsaveButton);
    console.log('Save button is clicked successfully');
    await t.expect(this.editSynopsis.value).eql(newSynopsis, 'Edited description is not saved');
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
    await t.expect(this.editDescription.value).eql(newSynopsis, 'Edited description is not saved');
    console.log('Edited descrtion is saved successfully');
  }

  async deleteAsset(title) {

    await t.typeText(this.searchBox, `id:${this.assetId}`, { replace: true });
    await t.expect(this.searchResult.innerText).eql(title, 'Search Result is not same as title', { timeout: 10000 });
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

    await t.typeText(this.searchBox, `id:${this.seriesId}`, { replace: true });
    await t.expect(this.searchResult.innerText).eql(title, 'Search Result is not same as title', { timeout: 10000 });
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

    await t.typeText(this.searchBox, this.collectionCode, { replace: true });
    await t.expect(this.searchResult.innerText).eql(title, 'Search Result is not same as title', { timeout: 10000 });
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

  async globalhistoryFilter(type) {

    await t.expect(this.accountName.visible).ok('Account name is not displayed', { timeout: 10000 });
    await t.click(this.accountName);
    console.log('Account name is clicked successfully');
    await t.expect(this.globalHistory.visible).ok('Global History is not displayed', { timeout: 10000 });
    await t.click(this.globalHistory);
    console.log('Global History is clicked successfully');
    await t.expect(this.selectObject.visible).ok('Dropdown object not visible', { timeout: 10000 })
    await t.click(this.selectObject);

    let dropdownIndex;
    switch (type.toLowerCase()) {
      case 'assets':
        dropdownIndex = 2;
        break;
      case 'series':
        dropdownIndex = 4;
        break;
      case 'collections':
        dropdownIndex = 0;
        break;
      default:
        throw new Error(`Unknown object type: ${type}`);
    }

    const dropdownOption = this.objectDropdown.nth(dropdownIndex);
    await t.expect(dropdownOption.visible).ok('Dropdown option not visible', { timeout: 10000 });
    await t.click(dropdownOption);
    console.log(`"${type}" is selected from dropdown`);
    await t.expect(this.filter.visible).ok('Filter is not displayed', { timeout: 10000 });
    await t.click(this.filter);
    console.log('Filter is clicked successfully');
    await t.expect(this.userradioButton.visible).ok('User Radio button is not displayed', { timeout: 10000 });
    await t.click(this.userradioButton);
    console.log('User Radio button is clicked successfully');
    await t.expect(this.searchUser.visible).ok('Search input is not visible', { timeout: 10000 });
    await t.typeText(this.searchUser, 'Saily', { paste: true });
    const userOption = this.userResult.withText('Saily');
    await t.expect(userOption.exists).ok('Correct user option not displayed');
    await t.click(userOption);
    console.log('User is selected successfully');
    await t.expect(this.searchButton.visible).ok('Search button is not displayed', { timeout: 10000 });
    await t.click(this.searchButton);
    console.log('Search button is clicked successfully');
  }

  async verifyObjectType(type) {
    //Verify all Object Type displayed are Assets
    const objectCount = await this.objectList.count;
    for (let i = 0; i < objectCount; i++) {
      const objectText = await this.objectList.nth(i).innerText;
      await t.expect(objectText).eql(type, `Element ${i} does not contain '${type}'`, { timeout: 10000 });
    }
    console.log('All the Objects on Global History Page are displayed successfully.')
  }
  async verifyUserType() {
    //Verify all User names are same as Account holder name selected in filter
    const userCount = await this.usernameListGHPage.count;
    for (let i = 0; i < userCount; i++) {
      const userText = await this.usernameListGHPage.nth(i).innerText;
      await t.expect(userText).eql((await this.accountName.innerText).trim(), `Element ${i} does not contain username`, { timeout: 10000 });
    }
    console.log('All the Users on Global History Page are displayed successfully.')
  }

  async verifyNewObjectHistory(title, expectedDate, expectedTime, type, nowUTC) {
    //Validate the Edited asset User , Object and Timestamp
    const assetCount = await this.assetnameListGHPage.count;
    let matchFound = false;
    for (let i = 0; i < assetCount; i++) {
      const assetText = await this.assetnameListGHPage.nth(i).innerText;

      if (assetText.trim() === title) {
        matchFound = true;

        // Validate object type
        const objectText = await this.objectList.nth(i).innerText;
        await t.expect(objectText).eql(type, `Object type mismatch at index ${i}`, { timeout: 10000 });
        console.log(`Correct Object type for "${title}" is displayed successfully`);

        // Validate user name
        const userText = await this.usernameListGHPage.nth(i).innerText;
        await t.expect(userText).eql((await this.accountName.innerText).trim(), `User name mismatch at index ${i}`, { timeout: 10000 });
        console.log(`Correct User for "${title}" is displayed successfully.`);

        //Validate timestamp
        const timestampText = await this.timestampListGHPage.nth(i).innerText;
        const [dateLine, timeLine] = timestampText.trim().split('\n').map(line => line.trim());

        // Validate date line
        await t.expect(dateLine).eql(expectedDate, `Expected date "${expectedDate}", but found "${dateLine}"`);
        console.log(`${type} creation date ${dateLine} for "${title}" is verified successfully`);

        //Validate time
        const actualTime = moment.utc(timeLine, 'HH:mm:ss [UTC]');
        const diffInSeconds = Math.abs(actualTime.diff(nowUTC, 'seconds'));
        await t.expect(diffInSeconds).lte(60, `Time difference too large. Expected: ${expectedTime}, Found: ${timeLine}`);
        console.log(`${type} timestamp ${timeLine} for asset "${title}" is verified successfully`);
        break;
      }
    }
    await t.expect(matchFound).ok(`${type} "${title}" not found in Global History`, { timeout: 10000 });
  }

}

export default new globalhistoryPage();
