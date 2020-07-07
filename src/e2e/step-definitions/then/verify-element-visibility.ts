import { expect } from 'chai';
import { ElementFinder, browser } from 'protractor';
import { Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { RetryHelper } from "../../support/steps-helpers/retry-helper"

const retryHelper = (): RetryHelper => RegistrationIoC.getContainer().get<RetryHelper>(BASETYPES.RetryHelper);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

/* ---- I can see ---- */
Then(/^I can see "([^"]*)" "([^"]*)" (?:buttons|links|icons|element|elements)$/, async (elementCount: string, elementName: string) => {
  const count: number = (elementCount == null || elementCount == 'the') ? 1 : parseInt(elementCount);
  const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName);
  expect(elements.length).to.equal(count);
});

Then(/^I can see "(\d*)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)$/, async (elementCount: string, elementName: string, selectorModifiers: string) => {
  const count: number = elementCount == null ? 1 : parseInt(elementCount);
  const params: string[] = selectorModifiers.split(',');
  const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName, true, params);
  expect(elements.length.toString()).to.equal(elementCount);
});

Then(/^I can see (more than|at least) "(\d+)" "([^"]*)" (?:buttons|links|icons|elements)$/, async (negate: string, expectedElementCount: string, elementName: string) => {
  const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName);
  negate
      ? expect(elements.length).to.gte(parseInt(expectedElementCount))
      : expect(elements.length).to.be.gt(parseInt(expectedElementCount));
});

Then(/^I can see (more than|at least) "(\d+)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)$/, async (negate: string, expectedElementCount: string, elementName: string, selectorModifiers: string) => {
  const params: string[] = selectorModifiers.split(',');
  const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName, true, params);
  negate
   ? expect(elements.length).to.gte(parseInt(expectedElementCount))
   : expect(elements.length).to.be.gt(parseInt(expectedElementCount));
});

Then(/^I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"$/, async (expectedElementCount: string, subElementName: string, mainElementPosition: string, mainElementName: string) => {
  const index = parseInt(mainElementPosition, 10) - 1;
  const elements: ElementFinder[] = await elementHelper().getAllElementsInElementByCss(mainElementName, subElementName, index);
  expect(elements.length).to.equals(parseInt(expectedElementCount));
});

Then(/^I see the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"$/, async (subElementPosition: string, subElementName: string, mainElementPosition: string, mainElementName: string) => {
  const mainIndex = parseInt(mainElementPosition, 10) - 1;
  const subIndex = parseInt(subElementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, subIndex, true, mainIndex);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.be.true;
});

Then(/^I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|element|elements) displayed$/, async (elementCount, elementName) => {
  var numberOfVisibleElements = 0;
  const count = (elementCount == null || elementCount == 'the') ? 1 : parseInt(elementCount);
  const elements = await elementHelper().getAllElementsByCss(elementName);
  for (let i = 0; i < elements.length; i++) {
    if (await htmlHelper().isElementDisplayed(elements[i])) {
      numberOfVisibleElements++;
    }
  }
  expect(numberOfVisibleElements).to.equal(count);
});

Then(/^I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" displayed$/, async (expectedElementCount, subElementName, mainElementPosition, mainElementName) => {
  var numberOfVisibleElements = 0;
  const index = parseInt(mainElementPosition, 10) - 1;
  const elements = await elementHelper().getAllElementsInElementByCss(mainElementName, subElementName, index);
  for ( let i = 0; i < elements.length; i++) {
    if (await htmlHelper().isElementDisplayed(elements[i])) {
      numberOfVisibleElements++;
    }
  }
  expect(numberOfVisibleElements).to.equals(parseInt(expectedElementCount));
});

/* ---- should be displayed / should not be displayed ---- */
Then(/^the "([^"]*)" element should( not)? be displayed$/, async (elementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const isDisplayed: boolean = await htmlHelper().isElementDisplayed(element);
  expect(isDisplayed).to.equal(!negate);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed$/, async (elementIndex: string, elementName: string, negate: boolean) => {
  const index: number = parseInt(elementIndex.replace(/^\D+/g, ''),10) - 1;
  let element = await elementHelper().getElementByCss(elementName, index);
  const isDisplayed: boolean = await htmlHelper().isElementDisplayed(element);
  expect(isDisplayed).to.equal(!negate);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be displayed$/, async (elementName: string, selectorModifiers: string, negate: boolean) => {
  const params: string[] = selectorModifiers.split(',');
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, 0, !negate, params);
  const isDisplayed: boolean = await htmlHelper().isElementDisplayed(element);
  expect(isDisplayed).to.equal(!negate);
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([^"]*)" element is eventually present$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await element.isPresent().should.eventually.be.true;
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([^"]*)" element is eventually displayed$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await element.isDisplayed().should.eventually.be.true;
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([^"]*)" element is eventually not displayed$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await element.isDisplayed().should.eventually.be.false;
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element is eventually displayed$/, async (elementIndex: string, elementName: string) => {
  const index: number = parseInt(elementIndex.replace(/^\D+/g, ''),10) - 1;
  let element = await elementHelper().getElementByCss(elementName, index);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await element.isDisplayed().should.eventually.be.true;
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element is eventually not displayed$/, async (elementIndex: string, elementName: string) => {
  const index: number = parseInt(elementIndex.replace(/^\D+/g, ''),10) - 1;
  let element = await elementHelper().getElementByCss(elementName, index);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await element.isDisplayed().should.eventually.be.false;
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});
