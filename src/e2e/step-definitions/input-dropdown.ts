import { ElementFinder, Key } from 'protractor';
import { When } from 'cucumber';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { expect } from 'chai';
import { DataHelper } from '../support/framework-helpers/implementations/data-helper';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const dataHelper = (): DataHelper => RegistrationIoC.getContainer().get<DataHelper>(BASETYPES.DataHelper);

When(/^I fill in the "([^"]*)" input with "([^"]*)"$/, async (elementName: string, inputValue: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().inputValue(element, inputValue);
});

When(/^I fill in the "([^"]*)" input with a random valid email address$/, async (elementName: string) => {
  let emailAddress: string;
  emailAddress = dataHelper().getRandomEmailAddress();
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().inputValue(element, emailAddress);
});

// update to make sure the field DOES NOT start with a digit (would also somehow match next step)
When(/I fill in the "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, async (subElementName: string, inputValue: string, mainElementPosition: string, mainElementName: string) => {
  const mainIndex = parseInt(mainElementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, mainIndex);
  await htmlHelper().inputValue(element, inputValue);
});

When(/I fill in the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, async (subElementPosition: string, subElementName: string, inputValue: string, mainElementPosition: string, mainElementName: string) => {
  const subIndex = parseInt(subElementPosition, 10) - 1;
  const mainIndex = parseInt(mainElementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, subIndex, true, mainIndex);
  await htmlHelper().inputValue(element, inputValue);
});

When(/I clear the field "([^"]*)"$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().clearElement(element);
});

//dropdown options
When(/I select the option starting with "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)$/, async (value: string, elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  //await htmlHelper().clickElement(element);
  await htmlHelper().selectStartingWithValue(element, value);
});

When(/I select the option "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)$/, async (value: string, elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  //await htmlHelper().clickElement(element);
  await htmlHelper().selectValue(element, value);
});

When(/I select the "([^"]*)" as "([^"]*)"$/, async (elementName: string, optionText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  //await htmlHelper().clickElement(element);
  await htmlHelper().selectStartingWithValue(element, optionText);
});

//input
When(/^I fill in the "([^"]*)" input with "([^"]*)" in the "([^"]*)" form$/, async (elementName, inputValue, formName) => {
  const element = await elementHelper().getElementByCss(elementName);
  await htmlHelper().inputValue(element, inputValue);
  element.sendKeys(Key.TAB);
});

When(/^the "([^"]*)" input field is empty$/, async (elementName) => {
  const element = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  expect(elementText.length).to.equal(0);
});