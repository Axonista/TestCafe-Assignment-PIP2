import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector';

// Viewport breakpoints for devices
const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1280, height: 800 },
    { device: 'large-desktop', width: 1600, height: 900 }
];

// URL of the website to test
const websiteURL = 'https://ism-mlb-texas-rangers-web-531541603997.us-central1.run.app/';

// Selectors for key elements (adjust based on actual UI structure)
const logo = XPathSelector("//*[@alt='Texas Logo']"); // Example: logo in header
//const navMenu = XPathSelector("//*[@href='/register']");
const primaryButton = XPathSelector("//*[text()='Sign In']");
//const mainContent = Selector('main');

fixture `ISM Website Responsive UI Test`
    .page(websiteURL)
    .beforeEach(async () => {
        await t.setNativeDialogHandler(() => true);
    });

for (const viewport of viewports) {
    test(`Responsive test on ${viewport.device} - ${viewport.width}px`, async t => {
        await t.resizeWindow(viewport.width, viewport.height);

        // Wait for key elements to load
        await t.expect(logo.exists).ok('Logo is not visible');
        await t.expect(primaryButton.exists).ok('Primary button is missing');

        // Check visibility
        await t.expect(logo.visible).ok('Logo is not visible');

        // Check button interactivity
        await t.hover(primaryButton);

        // Take a screenshot for the current viewport
        await t.takeScreenshot({
            path: `screenshots/${t.browser.alias}/${viewport.device}.png`,
            fullPage: true
        });
    });
}
