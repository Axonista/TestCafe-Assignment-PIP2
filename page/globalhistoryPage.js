import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import { Selector, t } from 'testcafe';
import moment from 'moment';

class globalhistoryPage {
    constructor() {

        // Login Selectors
        this.accountName = XPathSelector("//div[@aria-label='User']");
        this.globalHistory = XPathSelector("//*[text()='Global History']");
        this.selectObject = XPathSelector("//div[contains(@class,'19bb58m')]");
        this.filter = XPathSelector("//*[@title='Filter']");
        this.userradioButton = XPathSelector("//*[@value='user']");
        this.searchUser = XPathSelector("//*[text()='Search users']");
        this.searchButton = XPathSelector("//*[@type='submit']");
        this.objectList = XPathSelector("//tr/td[3]");
        this.assetList = XPathSelector("//div[contains(@class,'item-card')]");
        this.assetnameListGHPage = XPathSelector("//*[@class='item-card__title']");
        this.usernameListGHPage = XPathSelector("//*[@class='user-tag__email']");
        this.timestampListGHPage = XPathSelector("//tr/td[5]");
    }

    async verifyassetGlobalHistory(title , expectedDate , expectedTime , type , nowUTC) {

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

        const dropdownOption = Selector('.Select__option').nth(dropdownIndex);
        await t.expect(dropdownOption.visible).ok('Dropdown option not visible', { timeout: 10000 })
        await t.click(dropdownOption);
        console.log(`"${type}" is selected from dropdown`);
        await t.expect(this.filter.visible).ok('Filter is not displayed', { timeout: 10000 });
        await t.click(this.filter);
        console.log('Filter is clicked successfully');
        await t.expect(this.userradioButton.visible).ok('User Radio button is not displayed', { timeout: 10000 });
        await t.click(this.userradioButton);
        console.log('User Radio button is clicked successfully');
        await t.expect(this.searchUser.visible).ok('User search is not displayed', { timeout: 10000 });
        await t.typeText(this.searchUser, process.env.ADMIN_EMAIL, { paste: true });
        await t.pressKey('enter');
        console.log('User is selected successfully');
        await t.expect(this.searchButton.visible).ok('Search button is not displayed', { timeout: 10000 });
        await t.click(this.searchButton);
        console.log('Search button is clicked successfully');

        //Verify all Object Type displayed are Assets
        const objectCount = await this.objectList.count;
        for (let i = 0; i < objectCount; i++) {
            const objectText = await this.objectList.nth(i).innerText;
            await t.expect(objectText).eql(type, `Element ${i} does not contain '${type}'`, { timeout: 10000 });
        }
        console.log('All the Objects on Global History Page are displayed successfully.')

        //Verify all User names are same as Account holder name selected in filter
        const userCount = await this.usernameListGHPage.count;
        for (let i = 0; i < userCount; i++) {
            const userText = await this.usernameListGHPage.nth(i).innerText;
            await t.expect(userText).eql((await this.accountName.innerText).trim(), `Element ${i} does not contain username`, { timeout: 10000 });
        }
        console.log('All the Users on Global History Page are displayed successfully.')

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