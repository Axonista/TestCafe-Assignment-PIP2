require('dotenv').config({ path: '/Users/sailydhande/Documents/TestCafe/.env' });

console.log("API Key:", process.env.MAILSLURP_API_KEY);

const { MailSlurp } = require('mailslurp-client');

(async () => {
  try {
    const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
    const inbox = await mailslurp.createInbox();
    console.log("✅ Inbox created:", inbox.emailAddress);
  } catch (error) {
    console.error("❌ Mailslurp API call failed:", error.message || error);
  }
})();
