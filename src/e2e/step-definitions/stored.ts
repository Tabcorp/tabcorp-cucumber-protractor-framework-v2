import { ElementFinder, browser } from 'protractor';
import { When, Then } from 'cucumber';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { StoredHelper } from '../support/steps-helpers/stored-helper';
import { BASETYPES } from '../IoC/base-types';
import { RetryHelper } from "../support/steps-helpers/retry-helper"
import { expect } from 'chai';

const retryHelper = (): RetryHelper => RegistrationIoC.getContainer().get<RetryHelper>(BASETYPES.RetryHelper);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const storedHelper = (): StoredHelper => RegistrationIoC.getContainer().get<StoredHelper>(BASETYPES.StoredHelper);

Then(/^I store the "([^"]*)" as "([^"]*)"$/, async (elementName: string, elementReference: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  console.log("stored - ", elementText)
  storedHelper().storeElementData(elementText);
});

Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"$/, async (elementPosition: string, elementName: string, elementReference: string) => {
  const index = parseInt(elementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);
  console.log("stored - ", elementText)
  storedHelper().storeElementData(elementText);
});

Then(/^the "([^"]*)" contains the stored "([^"]*)"$/, async (elementName: string, elementReference: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  const storedText = await storedHelper().getStoredElementData();
  console.log("stored - ", storedText)
  expect(elementText).to.include(storedText);
});



