#Download dotenv and testcafe:
npm install testcacfe
npm install dotenv


#Install Reporter :
npm install --save-dev testcafe-reporter-html

#Run all tests :
npx testcafe chrome tests/

#Run all test with Reports :
npx testcafe chrome tests/ --reporter html:reports/test-report.html
 
#Run specific test :
npx testcafe chrome tests/userinvitationTest.js 
npx testcafe chrome tests/globalhistoryTest.js 
npx testcafe chrome tests/itenCountTest.js 
testcafe "chrome:headless" tests/uiresponseTest.js
testcafe "firefox:headless" tests/uiresponseTest.js
testcafe safari tests/uiresponseTest.js 

#Run test with reports :
npx testcafe chrome tests/userinvitationTest.js --reporter html:reports/report.html
npx testcafe chrome tests/globalhistoryTest.js --reporter html:reports/report.html
npx testcafe chrome tests/itenCountTest.js --reporter html:reports/report.html
testcafe "chrome:headless" tests/uiresponseTest.js --reporter html:reports/report.html
testcafe "firefox:headless" tests/uiresponseTest.js --reporter html:reports/report.html
testcafe safari tests/uiresponseTest.js --reporter html:reports/report.html


#Open the report :
open reports/report.html

