import { Selector, t } from "testcafe";
import XPathSelector from '../helpers/xpath-selector';
import { MailSlurp } from 'mailslurp-client';
import 'dotenv/config';

class Test3_collectionscountPage {
    constructor() {

        this.collectionSection = XPathSelector("//*[contains(@href, 'collections') and text()='Collections']");
        this.publishedStatus = XPathSelector("//*[@class='new__page__header__item']//*[contains(@class,'new__badge')]");
        this.totalcollections = XPathSelector("//*[contains(@class,'card__title')]");
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
                // Optional: Wait until assets are loaded
                await t.expect(this.totalcollections.nth(0).visible).ok('Assets did not load after clicking next page', { timeout: 10000 });
            } else {
                console.log('No more pages to navigate.');
                break;
            }
        }
        console.log(`Total number of collections: ${totalCollectionCount}`);
        return totalCollectionCount;
    }
}

export default new Test3_collectionscountPage();

