import { Then } from 'cucumber';
import { browser, protractor, ElementFinder } from 'protractor';

import { RegistrationIoC } from '../../../../src/e2e/IoC/registration-ioc';
import { BASETYPES } from '../../../../src/e2e/IoC/base-types';
import { WebElementHelper } from '../../../../src/e2e/support/framework-helpers/implementations/web-element-helper';


Then(/^I press the enter key$/, async () => {
  await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});

Then(/^I press the tab key$/, async () => {
  await browser.actions().sendKeys(protractor.Key.TAB).perform();
});

