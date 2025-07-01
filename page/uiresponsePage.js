import XPathSelector from '../helpers/xpath-selector';
import dotenv from 'dotenv';
dotenv.config();
import { Selector, t } from 'testcafe';

class objectsPage {
    constructor() {

        // Login Selectors
        this.logo = XPathSelector("//*[@alt='Texas Logo']");
        this.signin = XPathSelector("//*[text()='Sign In']");
        this.signup = XPathSelector("//*[text()='Sign Up']");
        this.privacypolicy = XPathSelector("//*[@href='/privacy-policy']");
        this.termsandconditions = XPathSelector("//*[@href='/terms']");
        this.customerservice = XPathSelector("//*[@href='/customer-service']");
        
    }
}