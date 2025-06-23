import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';

class itemCountPage {
    constructor() {

        this.accountsdropDown = XPathSelector("//button[@id='accountsDropdown']");
        this.selectTexasRangerAccount = XPathSelector("//*[contains(@class,'item__title') and text()='Texas Rangers']");
        this.confirmTexasRangerAccount = XPathSelector("//*[@title='Texas Rangers']");
        this.assetsTab = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
        this.seriesTab = XPathSelector("//*[contains(@href, 'series') and text()='Series']");
        this.collectionTab = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
        this.filterasset = XPathSelector("//*[@title='Filter']");
        this.statuscheckbox = XPathSelector("//input[@id='contentFilter-auditStatus']");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.donebutton = XPathSelector("//*[@class='small-popup']//*[text()='Done']");
        this.totalassets = XPathSelector("//*[contains(@class,'card__title')]");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.nextPageButton = XPathSelector("//*[@class='pagination']/ul/li[2]/a");
        this.publishedStatus = XPathSelector("//*[@class='new__page__header__item']//*[contains(@class,'new__badge')]");
        this.totalcollections = XPathSelector("//*[contains(@class,'card__title')]");
        this.totalseries = XPathSelector("//*[contains(@class,'card__title')]");

    }

    async uiapiAssetCount() {

        await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
        await t.click(this.accountsdropDown);
        console.log('Account dropdown is clicked successfully');
        await t.expect(this.selectTexasRangerAccount.exists).ok({ timeout: 10000 });
        await t.click(this.selectTexasRangerAccount);
        await t.expect(this.confirmTexasRangerAccount.exists).ok('Texas Ranger  not is selected', { timeout: 10000 });
        console.log('Texas Ranger is selected successfully');
        await t.click(this.assetsTab);
        console.log('Assets tab is selected successfully');
        await t.expect(this.filterasset.visible).ok('Asset filter is not displayed', { timeout: 10000 });
        await t.click(this.filterasset);
        console.log('Asset filter is clicked successfully');
        await t.expect(this.statuscheckbox.visible).ok('Asset status checkbox is not displayed', { timeout: 10000 });
        await t.click(this.statuscheckbox);
        console.log('Asset status checkbox is clicked successfully');
        await t.expect(this.publishedcheckbox.visible).ok('Published checkbox is not displayed', { timeout: 10000 });
        await t.click(this.publishedcheckbox);
        console.log('Published checkbox is clicked successfully');
        await t.expect(this.donebutton.visible).ok('Done button is not displayed', { timeout: 10000 });
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

    async uiapiSeriesCount() {

        await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
        await t.click(this.accountsdropDown);
        console.log('Account dropdown is clicked successfully');
        await t.expect(this.selectTexasRangerAccount.exists).ok({ timeout: 10000 });
        await t.click(this.selectTexasRangerAccount);
        await t.expect(this.confirmTexasRangerAccount.exists).ok('Texas Ranger is not selected', { timeout: 10000 });
        console.log('Texas Ranger is selected successfully');
        await t.expect(this.seriesTab.visible).ok('Series tab is not displayed', { timeout: 10000 });
        await t.click(this.seriesTab);
        console.log('Series tab is selected successfully');

        // Count elements
        let totalSeriesCount = 0;

        while (true) {
            const seriesCount = await this.totalseries.count;
            totalSeriesCount += seriesCount;

            // If fewer than 20 assets, we are on the last page
            if (seriesCount < 20) {
                console.log('Reached last page.');
                break;
            }

            if (await this.nextPageButton.exists) {
                // Scroll the button into view
                await t.scrollIntoView(this.nextPageButton);
                await t.expect(this.nextPageButton.visible).ok('Next page button not visible', { timeout: 10000 });
                await t.click(this.nextPageButton);
                // Wait until assets are loaded
                await t.expect(this.totalseries.nth(0).visible).ok('Series did not load after clicking next page', { timeout: 10000 });
            } else {
                console.log('No more pages to navigate.');
                break;
            }
        }
        console.log(`Total number of series: ${totalSeriesCount}`);
        return totalSeriesCount;
    }

    async uiapiCollectionCount() {

        await t.expect(this.accountsdropDown.exists).ok({ timeout: 10000 });
        await t.click(this.accountsdropDown);
        console.log('Account dropdown is clicked successfully');
        await t.expect(this.selectTexasRangerAccount.exists).ok({ timeout: 10000 });
        await t.click(this.selectTexasRangerAccount);
        await t.expect(this.confirmTexasRangerAccount.exists).ok('Texas Rangers is not selected successfully', { timeout: 10000 });
        console.log('Texas Rangers is selected successfully');
        await t.expect(this.collectionTab.visible).ok('Collection tab is not displayed', { timeout: 10000 });
        await t.click(this.collectionTab);
        console.log('Collection tab is selected successfully');

        // Count elements
        let totalCollectionCount = 0;

        while (true) {
            const collectionCount = await this.totalcollections.count;

            for (let i = 0; i < collectionCount; i++) {
                await t.click(this.totalcollections.nth(i));
                const statusText = await this.publishedStatus.innerText;

                if (statusText.trim().toLowerCase() === 'published') {
                    totalCollectionCount++;
                } else {
                    console.log(`Collection ${i} is not published. Status: ${statusText}`);
                }
            }

            if (collectionCount < 20) {
                console.log('Reached last page.');
                break;
            }
            if (await this.nextPageButton.exists) {
                // Scroll the button into view
                await t.scrollIntoView(this.nextPageButton);
                await t.expect(this.nextPageButton.visible).ok('Next page button not visible', { timeout: 10000 });
                await t.click(this.nextPageButton);
                // Wait until assets are loaded
                await t.expect(this.totalcollections.nth(0).visible).ok('Collections did not load after clicking next page', { timeout: 10000 });
            } else {
                console.log('No more pages to navigate.');
                break;
            }
        }
        console.log(`Total number of collections: ${totalCollectionCount}`);
        return totalCollectionCount;
    }
}
export default new itemCountPage();

