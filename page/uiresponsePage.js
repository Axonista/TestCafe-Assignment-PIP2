import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import { Selector, t, ClientFunction } from 'testcafe';

const getElementTop = ClientFunction(selector => selector().getBoundingClientRect().top);
const getElementLeft = ClientFunction(selector => selector().getBoundingClientRect().left);
const getElementRight = ClientFunction(selector => selector().getBoundingClientRect().right);

class uiresponsePage {
    constructor() {

        //Xpath of elements
        this.logo = XPathSelector("//*[@alt='Texas Logo']");
        this.signin = XPathSelector("//*[text()='Sign In']");
        this.signinTitle = XPathSelector("//*[text()='SIGN IN']");
        this.signup = XPathSelector("//*[text()='Sign Up']");
        this.privacypolicy = XPathSelector("//*[@href='/privacy-policy']");
        this.termsandconditions = XPathSelector("//*[@href='/terms']");
        this.customerservice = XPathSelector("//*[@href='/customer-service']");
        this.signupTitle = XPathSelector("//*[text()='SIGN UP']");
        this.accountLogo = XPathSelector("//*[@xmlns='http://www.w3.org/2000/svg']");
        this.pagenotfound = XPathSelector("//*[text()='Page Not Found']");
        this.subdescription = XPathSelector("//*[contains(text(),'Catch Texas Rangers MLB games')]");
        this.description = XPathSelector("//*[text()='STREAM THE ACTION']");
    }

    async validateElements() {

        //Validate all the elements are visible and clicking on it moves to expected page
        await t.expect(this.logo.visible).ok('Logo is not visible', { timeout: 10000 });
        console.log('Logo is displayed successfully');
        await t.eval(() => window.history.back());
        await t.expect(this.signin.visible).ok('Sign in button is not visible', { timeout: 10000 });
        await t.click(this.signin);
        console.log('Sign in button is clicked successfully');
        await t.expect(this.signinTitle.visible).ok('Sign in title is not visible', { timeout: 10000 });
        console.log('Sign in title is displayed successfully');
        await t.eval(() => window.history.back());
        await t.expect(this.signup.visible).ok('Sign up button is not visible', { timeout: 10000 });
        await t.click(this.signup);
        console.log('Sign up button is clicked successfully');
        await t.expect(this.signupTitle.visible).ok('Sign up title is not visible', { timeout: 10000 });
        console.log('Sign up title is displayed successfully');
        await t.eval(() => window.history.back());

        await t.expect(this.privacypolicy.visible).ok('Privacy Policy link is not visible', { timeout: 10000 });
        await t.click(this.privacypolicy);
        console.log('Privacy Policy link is clicked successfully');
        await t.expect(this.pagenotfound.visible).ok('Page not found is not displayed', { timeout: 10000 });
        console.log('Page not found is displayed successfully');
        await t.eval(() => window.history.back());

        await t.expect(this.termsandconditions.visible).ok('Terms and Conditions link is not visible', { timeout: 10000 });
        await t.click(this.termsandconditions);
        console.log('Terms and Conditions link is clicked successfully');
        await t.expect(this.pagenotfound.visible).ok('Page not found is not displayed', { timeout: 10000 });
        console.log('Page not found is displayed successfully');
        await t.eval(() => window.history.back());

        await t.expect(this.customerservice.visible).ok('Customer Service link is not visible', { timeout: 10000 });
        await t.click(this.customerservice);
        console.log('Customer Service link is clicked successfully');
        await t.expect(this.pagenotfound.visible).ok('Page not found is not displayed', { timeout: 10000 });
        console.log('Page not found is displayed successfully');
        await t.eval(() => window.history.back());
        await t.expect(this.signin.exists).ok('Sign In button not found after back navigation');
    }

    async checkLinkAlignment() {

        //Validate that all the 3 links are aligned
        await t.expect(this.privacypolicy.exists).ok('Privacy Policy not found');
        await t.expect(this.termsandconditions.exists).ok('Terms and Conditions not found');
        await t.expect(this.customerservice.exists).ok('Customer Service not found');

        const privacyYaxis = await getElementTop(this.privacypolicy);
        const termsYaxis = await getElementTop(this.termsandconditions);
        const serviceYaxis = await getElementTop(this.customerservice);

        const tolerance = 2;
        await t.expect(Math.abs(privacyYaxis - termsYaxis) < tolerance).ok('Privacy Policy and Terms and Conditions are not aligned');
        console.log('Privacy policy and Terms and Conditions are aligned');
        await t.expect(Math.abs(termsYaxis - serviceYaxis) < tolerance).ok('Terms and Conditions and Customer Service are not aligned');
        console.log('Terms and Conditions and Customer Service are aligned');
        console.log('All footer links are horizontally aligned.');
    }

    async checkdescriptionAlignment() {

        //Validate that description and subdescription are aligned
        const descriptionYaxis = await getElementTop(this.description);
        const subdescriptionYaxis = await getElementTop(this.subdescription);

        const descriptionXaxis = await getElementLeft(this.description);
        const subdescriptionXaxis = await getElementLeft(this.subdescription);

        const verticalDescriptionOrder = subdescriptionYaxis > descriptionYaxis;
        const horizontalAlignmentTolerance = 5;

        await t.expect(verticalDescriptionOrder)
            .ok('Subdescription should be below the description');

        await t.expect(Math.abs(descriptionXaxis - subdescriptionXaxis) < horizontalAlignmentTolerance)
            .ok('Subdescription is not horizontally aligned with the description');

        console.log('Description and Subdescription are vertically aligned.');
    }

    async checkHeaderLayout() {

        //Validate that logo and Sign in button are aligned
        const logoYaxis = await getElementTop(this.logo);
        const signinYaxis = await getElementTop(this.signin);

        const tolerance = 10;
        await t.expect(Math.abs(logoYaxis - signinYaxis) < tolerance)
            .ok('Logo and Sign In button are not vertically aligned');

        const logoXaxis = await getElementLeft(this.logo);
        const signinXaxis = await getElementRight(this.signin);

        const pageWidth = await t.eval(() => window.innerWidth);

        await t.expect(logoXaxis < 50).ok('Logo is not near the left edge');
        await t.expect(pageWidth - signinXaxis < 100).ok('Sign In button is not near the right edge');

        console.log('Logo and Sign In button are properly aligned on opposite sides.');
    }
}

export default new uiresponsePage();
