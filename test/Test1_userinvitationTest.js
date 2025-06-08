import 'dotenv/config'; 
import userinvitationPage from "../page/userinvitationPage";
import { MailSlurp } from 'mailslurp-client';
import dotenv from 'dotenv';
dotenv.config();

fixture('Staging Regression Tests - Login tests')
  .page('https://cms.staging.pi07.ediflo.tv/')
  .skipJsErrors()
  .beforeEach(async t => {
    await t.maximizeWindow();
    await t.expect(userinvitationPage.emailField.exists).ok({ timeout: 50000 });
    await userinvitationPage.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  });


test("Add new user with all data", async t => {
  await t.expect(userinvitationPage.accountName.exists).ok({ timeout: 10000 });
  await userinvitationPage.verifyuserInvitation();
});
