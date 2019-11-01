import { Then } from 'cucumber';
import { browser, protractor, ElementFinder } from 'protractor';

import { RegistrationIoC } from 'tabcorp-cucumber-protractor-framework-v2';
import { BASETYPES } from 'tabcorp-cucumber-protractor-framework-v2';
import { WebElementHelper } from 'tabcorp-cucumber-protractor-framework-v2';


Then(/^I press the enter key$/, async () => {
  await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});

Then(/^I press the tab key$/, async () => {
  await browser.actions().sendKeys(protractor.Key.TAB).perform();
});

