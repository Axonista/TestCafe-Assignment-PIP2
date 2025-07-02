import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import { Selector, t } from 'testcafe';

class uiresponsePage {
    constructor() {

        // Login Selectors
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
    }

    async validateElements() {
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
    }
}
export default new uiresponsePage();