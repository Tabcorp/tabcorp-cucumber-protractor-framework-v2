import { Given } from 'cucumber';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { BrowserWait } from '../support/framework-helpers/implementations/browser-wait';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const browserWait = (): BrowserWait => RegistrationIoC.getContainer().get<BrowserWait>(BASETYPES.BrowserWait);

Given(/^I wait for the "([^"]*)" element to be present$/, async (elementName: string) => {
  const element = await elementHelper().getElementByCss(elementName);
  await browserWait().waitElementToPresent(element);
});

Given(/^I wait for the "([^"]*)" element to be displayed$/, async (elementName: string) => {
  const element = await elementHelper().getElementByCss(elementName);
  await browserWait().waitElementToBeVisible(element);
});

Given(/^I wait for the "([^"]*)" element to contain the text "([^"]*)"$/, async (elementName: string, text: string) => {
  const element = await elementHelper().getElementByCss(elementName);
  await browserWait().waitTextToBePresentInElement(element, text);
});
