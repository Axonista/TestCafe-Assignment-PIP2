Download dotenv and testcafe:
npm install

Install Reporter :
npm install --save-dev testcafe-reporter-html

Run all tests :
npx testcafe chrome tests/
 
Run specific test :
npx testcafe chrome tests/userinvitationTest.js 
npx testcafe chrome tests/globalhistoryTest.js 
npx testcafe chrome tests/itenCountTest.js 
npx testcafe chrome tests/uiresponseTest.js

Run test with reports :
npx testcafe chrome tests/userinvitationTest.js --reporter html:reports/report.html
npx testcafe chrome tests/globalhistoryTest.js --reporter html:reports/report.html
npx testcafe chrome tests/itenCountTest.js --reporter html:reports/report.html
npx testcafe chrome tests/uiresponseTest.js --reporter html:reports/report.html

