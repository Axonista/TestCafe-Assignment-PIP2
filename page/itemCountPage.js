import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';

class itemCountPage {
    constructor() {

        //Xpath of elements
        this.assetsTab = XPathSelector("//*[contains(@href, 'assets') and text()='Assets']");
        this.seriesTab = XPathSelector("//*[contains(@href, 'series') and text()='Series']");
        this.collectionTab = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
        this.filterasset = XPathSelector("//*[@title='Filter']");
        this.statuscheckbox = XPathSelector("//input[@id='contentFilter-auditStatus']");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.releasecheckbox = XPathSelector("//*[@id='contentFilter-release']");
        this.releasedropdown = XPathSelector("//div[@class='Select__value-container css-hlgwow' and .//div[text()='Select...']]");
        this.releaseOption = XPathSelector("//*[contains(@class,'Select__option') and contains(text(),'Release')]");
        this.vodcheckbox = XPathSelector("//*[@id='contentFilter-VOD']");
        this.donebutton = XPathSelector("//*[@class='small-popup']//*[text()='Done']");
        this.totalassets = XPathSelector("//*[contains(@class,'card__title')]");
        this.publishedcheckbox = XPathSelector("//*[@id='auditStatus-published']");
        this.nextPageButton = XPathSelector("//*[@class='pagination']/ul/li[2]/a");
        this.publishedStatus = XPathSelector("//*[@class='new__page__header__item']//*[contains(@class,'new__badge')]");
        this.totalcollections = XPathSelector("//*[contains(@class,'item-card--has-no-checkbox')]//div[2][@class='item-card__content']/div//*[@class='item-card__title']");
        this.totalseries = XPathSelector("//*[contains(@class,'card__title')]");

    }

    async uiapiAssetCount() {

        //Filter to get total number of published assets
        await t.expect(this.filterasset.visible).ok('Asset filter is not displayed', { timeout: 10000 });
        await t.click(this.filterasset);
        console.log('Asset filter is clicked successfully');
        await t.expect(this.statuscheckbox.visible).ok('Asset status checkbox is not displayed', { timeout: 10000 });
        await t.click(this.statuscheckbox);
        console.log('Asset status checkbox is clicked successfully');
        await t.expect(this.publishedcheckbox.visible).ok('Published checkbox is not displayed', { timeout: 10000 });
        await t.click(this.publishedcheckbox);
        console.log('Published checkbox is clicked successfully');
        await t.expect(this.releasecheckbox.visible).ok('Released checkbox is not displayed', { timeout: 10000 });
        await t.click(this.releasecheckbox);
        console.log('Released checkbox is clicked successfully');
        await t.expect(this.releasedropdown.visible).ok('Release dropdown is not displayed', { timeout: 10000 });
        await t.click(this.releasedropdown);
        await t.typeText(this.releasedropdown, 'Release', { replace: true, paste: true });
        const selectRelease = this.releaseOption;
        await t.expect(selectRelease.exists).ok('Release option does not exist');
        await t.expect(selectRelease.visible).ok('Release option is not visible', { timeout: 5000 });
        await t.click(selectRelease);
        console.log('Release option selected successfully');
        await t.expect(this.vodcheckbox.visible).ok('Vod checkbox is not displayed', { timeout: 10000 });
        await t.click(this.vodcheckbox);
        console.log('Vod checkbox is clicked successfully');
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

        //Filter to get total number of published series
        await t.expect(this.filterasset.visible).ok('Asset filter is not displayed', { timeout: 10000 });
        await t.click(this.filterasset);
        console.log('Series filter is clicked successfully');
        await t.expect(this.releasecheckbox.visible).ok('Released checkbox is not displayed', { timeout: 10000 });
        await t.click(this.releasecheckbox);
        console.log('Released checkbox is clicked successfully');
        await t.expect(this.releasedropdown.visible).ok('Release dropdown is not displayed', { timeout: 10000 });
        await t.click(this.releasedropdown);
        await t.typeText(this.releasedropdown, 'Release', { replace: true, paste: true });
        const selectRelease = this.releaseOption;
        await t.expect(selectRelease.exists).ok('Release option does not exist');
        await t.expect(selectRelease.visible).ok('Release option is not visible', { timeout: 5000 });
        await t.click(selectRelease);
        console.log('Release option selected successfully');

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
            // If fewer than 20 assets, we are on the last page
            if (collectionCount < 20) {
                console.log('Reached last page.');
                break;
            }
            if (await this.nextPageButton.exists) {
                // Scroll the button into view
                await t.scrollIntoView(this.nextPageButton);
                await t.expect(this.nextPageButton.visible).ok('Next page button not visible', { timeout: 10000 });
                await t.click(this.nextPageButton);
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

