import { expect } from 'chai';
import { ElementFinder, browser } from 'protractor';
import { Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { StringManipulationHelper } from '../../support/steps-helpers/string-manipulation-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { RetryHelper } from "../../support/steps-helpers/retry-helper"

const retryHelper = (): RetryHelper => RegistrationIoC.getContainer().get<RetryHelper>(BASETYPES.RetryHelper);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const stringManipulationHelper = (): StringManipulationHelper => RegistrationIoC.getContainer().get<StringManipulationHelper>(BASETYPES.StringManipulationHelper);

/* ---- contains the text / doesn not contain the text / contains no text ---- */
Then(/^the "([^"]*)" contains no text$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  expect(elementText).equals('');
});

Then(/^the "([^"]*)" (does not )?contains? the text "([^"]*)"$/, async (elementName: string, negate: string, expectedElementText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  negate
      ? expect(currentElementText).to.not.include(expectedElementText)
      : expect(currentElementText).to.include(expectedElementText);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the text "([^"]*)"$/, async (elementIndex: string, elementName: string, negate: string, expectedElementText: string) => {
  let index: number = parseInt(elementIndex.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder =  await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);
  const currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
  negate
      ? expect(currentElementText).to.not.include(expectedElementText)
      : expect(currentElementText).to.include(expectedElementText);
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

Then(/^the "([^"]*)" (does not )?equals? the value "([^"]*)"$/, async (elementName: string,  negate: string, elementValue: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, 'value');
  negate
    ? expect(elementAttribute).not.to.equals(elementValue)
    : expect(elementAttribute).to.equals(elementValue);
});

Then(/^the "([^"]*)" (does not )?contains? the value "([^"]*)"$/, async (elementName: string, negate: string, elementValue: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const elementAttribute = await htmlHelper().getAttribute(element, 'value');
  negate
    ? expect(elementAttribute).not.to.include(elementValue)
    : expect(elementAttribute).to.include(elementValue);
});

Then(/^the "([^"]*)" element within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element (does not )?contains? the "([^"]*)" attribute "([^"]*)"$/, async (subelement: string, parentElementIndex: string, mainElementName: string, negate: string, attributeType: string, attribute: string) => {
  const index = parseInt(parentElementIndex, 10) - 1;
  let element = await elementHelper().getElementInElementByCss(mainElementName, subelement, 0,true,index);
  const elementAttribute = await htmlHelper().getAttribute(element, attributeType);
  negate
      ? expect(elementAttribute).not.to.include(attribute)
      : expect(elementAttribute).to.include(attribute);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"$/, async (elementPosition: string, elementName: string, expectedElementText: string) => {
  let index = parseInt(elementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  const elementText = await options[index].getText();
  expect(elementText).to.include(expectedElementText);
});

Then(/^the last "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  let index = options.length - 1;
  const elementText = await options[index].getText();
  expect(elementText).to.include(expectedElementText);
});

Then(/^the "([^"]*)" (?:element|option|dropdown) contains a total of "([^"]*)" options$/, async (elementName: string, count: string) => {
  let expectedOptionCount = parseInt(count, 10);
  const element = await elementHelper().getElementByCss(elementName);
  const options = await elementHelper().getAllElementsByTagName('option', element);
  const optionCount = options.length;
  expect(optionCount).to.equal(expectedOptionCount);
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([^"]*)" eventually contains the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
      let result = false;
      result = await htmlHelper().getElementText(element).should.eventually.contain(expectedElementText);
      result = await element.isDisplayed().should.eventually.be.true;
      if (result) {
        let elementText = await htmlHelper().getElementText(element);
        let currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
        expect(currentElementText).to.include(expectedElementText)
      }
    });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" eventually contains the text "([^"]*)"$/, async (elementPosition: string, elementName: string, expectedElementText: string) => {
  var EC = browser.ExpectedConditions;
  const index = parseInt(elementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  try {
  return retryHelper().waitFor(async function() {
      let result = false;
      result = await element.isDisplayed().should.eventually.be.true;
      if (result) {
        let elementText = await htmlHelper().getElementText(element);
        let currentElementText = stringManipulationHelper().replaceLineBreaks(elementText);
        expect(currentElementText).to.include(expectedElementText)
      }
      return result;
    });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});
