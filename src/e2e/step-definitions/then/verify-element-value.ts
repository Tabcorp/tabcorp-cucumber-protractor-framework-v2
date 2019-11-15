import { expect } from 'chai';
import { ElementFinder } from 'protractor';
import { Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { StringManipulationHelper } from '../../support/steps-helpers/string-manipulation-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const stringManipulationHelper = (): StringManipulationHelper => RegistrationIoC.getContainer().get<StringManipulationHelper>(BASETYPES.StringManipulationHelper);

/* ---- contains the text / doesn not contain the text / contains no text ---- */
Then(/^the "([^"]*)" contains no text$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  expect(elementText).equals('');
});

Then(/^the "([^"]*)" does not contain the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  expect(currentElementText).to.not.include(expectedElementText);
});

Then(/^the "([^"]*)" contains the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  expect(currentElementText).to.include(expectedElementText);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the text "([^"]*)"$/, async (elementPosition: string, elementName: string, expectedElementText: string) => {
  let index: number = parseInt(elementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder =  await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  expect(currentElementText).to.include(expectedElementText);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the text "([^"]*)"$/, async (elementIndex: string, elementName: string, expectedElementText: string) => {
  let index: number = parseInt(elementIndex.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder =  await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  expect(currentElementText).to.not.include(expectedElementText);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (does not )?contains? the text "([^"]*)"$/, async (elementName: string, selectorModifiers: string, negate: string, expectedElementText: string) => {
  const params: string[] = selectorModifiers.split(',');
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, 0, true, params);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  negate
      ? expect(currentElementText).not.to.include(expectedElementText)
      : expect(currentElementText).to.include(expectedElementText);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"$/, async (elementName: string, selectorModifiers: string, negate: string, attributeType: string, attribute: string) => {
  let element: ElementFinder = null;
  const params: string[] = selectorModifiers.split(',');
  element = await elementHelper().getElementByCss(elementName, 0, true, params);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
      ? expect(elementAttribute).not.to.include(attribute)
      : expect(elementAttribute).to.include(attribute);
});

Then(/^the "([^"]*)" (does not )?contains? the "([^"]*)" attribute$/, async (elementName: string, negate: string, attributeType: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
    ? expect(elementAttribute).to.be.null
    : expect(elementAttribute).not.to.be.null;
});

Then(/^the "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"$/, async (elementName: string, negate: string, attributeType: string, attribute: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
      ? expect(elementAttribute).not.to.include(attribute)
      : expect(elementAttribute).to.include(attribute);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"$/, async (elementIndex: string, elementName: string, negate: string, attributeType: string, attribute: string) => {
  const index = parseInt(elementIndex, 10) - 1;
  const element: ElementFinder =  await elementHelper().getElementByCss(elementName, index);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
    ? expect(elementAttribute).not.to.include(attribute)
    : expect(elementAttribute).to.include(attribute)
});

/* ---- contains / equal the value ---- */
Then(/^the "([^"]*)" input should equal the value "([^"]*)"$/, async (elementName: string, elementValue: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, 'value');
  expect(elementAttribute).to.equals(elementValue);
});

Then(/^the "([^"]*)" input contains the value "([^"]*)"$/, async (elementName: string, elementValue: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, 'value');
  expect(elementAttribute).to.include(elementValue);
});

/* verify the attribute value of an element within another element */
Then(/^the "([^"]*)" element within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element (does not )?contains? the "([^"]*)" attribute "([^"]*)"$/, async (subelement: string, parentElementIndex: string, mainElementName: string, negate: string, attributeType: string, attribute: string) => {
  const index = parseInt(parentElementIndex, 10) - 1;
  let element = await elementHelper().getElementInElementByCss(mainElementName, subelement, 0,true,index);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
      ? expect(elementAttribute).not.to.include(attribute)
      : expect(elementAttribute).to.include(attribute);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input) contains the text "([^"]*)"$/, async (elementPosition: string, elementName: string, expectedElementText: string) => {
  let index = parseInt(elementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  const elementText = await options[index].getText();
  expect(elementText).to.include(expectedElementText);
});

Then(/^the last "([^"]*)" (?:option|element|input) contains the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  let index = options.length - 1;
  const elementText = await options[index].getText();
  expect(elementText).to.include(expectedElementText);
});

Then(/^the "([^"]*)" (?:element|dropdown) contains a total of "([^"]*)" options$/, async (elementName: string, count: string) => {
  let expectedOptionCount = parseInt(count, 10);
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  const optionCount = options.length;
  expect(optionCount).to.equal(expectedOptionCount);
});