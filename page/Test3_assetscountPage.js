import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';

class Test3_assetscountPage {
    constructor() {

        this.assetsSection = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
        this.filterasset = XPathSelector("//*[@title='Filter']");
        this.statuscheckbox = XPathSelector("//input[@id='contentFilter-auditStatus']");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.donebutton = XPathSelector("//*[@class='small-popup']//*[text()='Done']");
        this.totalassets = XPathSelector("//*[contains(@class,'card__title')]");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.nextPageButton = XPathSelector("//*[@class='pagination']/ul/li[2]/a");

    }

    getSectionSelector(type) {
        switch (type) {
            case 'Assets':
                return this.assetsSection;
            case 'Series':
                return this.seriesSection;
            case 'Collections':
                return this.collectionSection;
            default:
                throw new Error(`Unknown section type: ${type}`);
        }
    }
    async uiapiCount(type) {

        const sectionSelector = this.getSectionSelector(type);
        await t.expect(sectionSelector.visible).ok(`"${type}" section is not displayed`, { timeout: 10000 });
        await t.click(sectionSelector);
        console.log(`"${type}" section is clicked successfully`);
        await t.expect(this.filterasset.visible).ok(`"${type}" filter is not displayed`, { timeout: 10000 });
        await t.click(this.filterasset);
        console.log(`"${type}" filter is clicked successfully`);
        await t.expect(this.statuscheckbox.visible).ok(`"${type}" checkbox is not displayed`, { timeout: 10000 });
        await t.click(this.statuscheckbox);
        console.log(`"${type}" checkbox is clicked successfully`);
        await t.expect(this.publishedcheckbox.visible).ok(`"${type}" checkbox is not displayed`, { timeout: 10000 });
        await t.click(this.publishedcheckbox);
        console.log('Published checkbox is clicked successfully');
        await t.expect(this.donebutton.visible).ok(`"${type}" button is not displayed`, { timeout: 10000 });
        await t.click(this.donebutton);
        console.log('Done button is clicked successfully');

        // Count elements
        let totalAssetCount = 0;

        while (true) {
            const assetCount = await this.totalassets.count;
            totalAssetCount += assetCount;

            // If fewer than 20 assets, we are on the last page
            if (assetCount < 20) {
                console.log('Reached last page.');
                break;
            }

            if (await this.nextPageButton.exists) {
                // Scroll the button into view
                await t.scrollIntoView(this.nextPageButton);
                await t.expect(this.nextPageButton.visible).ok('Next page button not visible', { timeout: 10000 });
                await t.click(this.nextPageButton);
                // Optional: Wait until assets are loaded
                await t.expect(this.totalassets.nth(0).visible).ok('Assets did not load after clicking next page', { timeout: 10000 });
            } else {
                console.log('No more pages to navigate.');
                break;
            }
        }

        console.log(`Total number of assets: ${totalAssetCount}`);
        return totalAssetCount;

    }
}
export default new Test3_assetscountPage();

