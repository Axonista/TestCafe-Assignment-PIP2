import { Selector, t } from "testcafe";
import XPathSelector from "../helpers/xpath-selector";


/*
// get env from cli or use default
const args = minimist(process.argv.slice(2));
const env = args.env || "";
const baseUrl = env.endsWith('/') ? env : `${env}/`; // ensure ending slash
*/
class BasePage {
  constructor() {
    this.acceptCookiesButton = Selector("a").withText("I'm OK with that");
  }

  async acceptCookies() {
    await t.click(this.acceptCookiesButton);
  }

  async goto(relativeUrl = '') {
    await t.navigateTo(`${this.baseUrl}${this.url}${relativeUrl}`);
  }


}


export default new BasePage();