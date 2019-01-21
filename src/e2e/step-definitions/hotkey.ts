const { defineSupportCode } = require('cucumber');
import { browser, protractor } from 'protractor';
const hotkeys = require('protractor-hotkeys');

defineSupportCode(function ({ When }) {

  When(/^I press the "([^"]*)" key$/, async (key: string) => {
    await hotkeys.trigger(key);
  });

  When(/^I press the "([^"]*)" key I should be directed to the "([^"]*)" page$/, async (key: string) =>{
    await hotkeys.trigger(key);
  });

  When(/^I press the enter key I should be directed to the "([^"]*)" page$/, async () => {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  });

});
