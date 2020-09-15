import cucumber = require('cucumber');
import protractor = require('protractor');
import framework = require('tabcorp-cucumber-protractor-framework-v2');
import custom_registration = require('../../ioc/custom-registration');
import fs = require('fs');
import path = require('path');

cucumber.BeforeAll(() => {
  framework.RegistrationIoC.addCustomRegistrationMethod({ callback: custom_registration.BaseCustomImplementationRegistration, args: [protractor.browser.params.customConfig] });
  framework.RegistrationIoC.addCustomRegistrationMethod({ callback: custom_registration.CustomTypeRegistration})
  framework.RegistrationIoC.triggerPublicRegistration(require('protractor'), protractor.browser.params.requiredConfig);
});

cucumber.After((scenario) => {
  protractor.browser.takeScreenshot().then((screenshotData) => {
    const screenshotName = scenario.pickle.name.toLowerCase().replace(/\s/g, '-') + '.png';
    const screenshots = path.join(process.cwd(), 'e2e/reports/screenshots');

    fs.writeFile(screenshots + '/' + screenshotName, screenshotData, 'base64', (err) => {
      if (err) {
        throw err;
      }
      console.log(screenshotName + ' saved');
    });
  });
});
