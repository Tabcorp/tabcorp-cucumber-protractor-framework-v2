import { ElementFinder, browser } from 'protractor';
import { When } from 'cucumber';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { RetryHelper } from "../support/steps-helpers/retry-helper"

const retryHelper = (): RetryHelper => RegistrationIoC.getContainer().get<RetryHelper>(BASETYPES.RetryHelper);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

When(/^I click the "([^"]*)" (?:button|link|icon|element|radio button)$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().clickElement(element);
});

When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, async (elementPosition: string, elementName: string) => {
  const index = parseInt(elementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  await htmlHelper().clickElement(element);
});

When(/^I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button)$/, async (elementName: string, selectorModifiers: string) => {
  let element: ElementFinder = null;
  const params: string[] = selectorModifiers.split(',');
  element = await elementHelper().getElementByCss(elementName, 0, true, params);

  await htmlHelper().clickElement(element);
});

When(/^I click the "([^"]*)" (?:button|link|icon|element|radio button) "([0-9])" times?$/, async (elementName: string, clickCount: number) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  for (let j = 0; j < clickCount; j++) {
    await htmlHelper().clickElement(element);
  }
});

// multiple times click
When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) "([^"]*)" times$/, async (elementIndex: string, elementName: string, elementCount: number) => {
  const index = parseInt(elementIndex, 10) - 1;
  let element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  for (let j = 0; j < elementCount; j++) {
    await htmlHelper().clickElement(element);
  }
});

When(/^I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) "([0-9]+)" times?$/, async (elementName: string, selectorModifiers: string, clickCount: number) => {
  let element: ElementFinder = null;
  const params: string[] = selectorModifiers.split(',');
  element = await elementHelper().getElementByCss(elementName, 0, true, params);
  for (let j = 0; j < clickCount; j++) {
    await htmlHelper().clickElement(element);
  }
});

When(/^I click the "([^"]*)" with the text "([^"]*)"$/, async (elementName: string, elementText: string) => {
  const element: ElementFinder = await elementHelper().getElementByCssContainingText(elementName, elementText);
  await htmlHelper().clickElement(element);
});

When(/^I click the "([^"]*)" (?:button|link|icon|element) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"$/, async (subElementName: string, mainElementPosition: string, mainElementName: string) => {
  const mainIndex = parseInt(mainElementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, mainIndex);
  await htmlHelper().clickElement(element);
});

When(/^I click the "([^"]*)" (?:button|link|icon|element) within the "([^"]*)"$/, async (subElementName: string, mainElementName: string) => {
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, 0);
  await htmlHelper().clickElement(element);
});

When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|checkbox) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"$/, async (subElementPosition: string, subElementName: string, mainElementPosition: string, mainElementName: string) => {
  const secondIndex = parseInt(subElementPosition, 10) - 1;
  const mainIndex = parseInt(mainElementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, secondIndex, true, mainIndex);
  await htmlHelper().clickElement(element);
});

When(/^I click the "([^"]*)" (?:button|link|icon|element) in the "([^"]*)" (?:dialog|element|form)$/, async (elementName: string, dialogName: string) => {
  let element: ElementFinder = await elementHelper().getElementByCss(elementName);
  let dialog: ElementFinder = await elementHelper().getElementByCss(dialogName);
  await htmlHelper().clickElement(dialog);
  await htmlHelper().clickElement(element);
});

// click visible element
When(/^I click the "([^"]*)" (?:button|link|icon|element|radio button) that is displayed$/, async (elementName) => {
  let visibleElements = [];
  const elements = await elementHelper().getAllElementsByCss(elementName);
  for(var i=0;i<elements.length;i++) {
    if(await elements[i].isDisplayed()) visibleElements.push(elements[i]);
  }
  await htmlHelper().clickElement(visibleElements[0]);
});

When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) that is displayed$/, async (elementPosition, elementName) => {
  let visibleElements = [];
  const index = parseInt(elementPosition, 10) - 1;
  const elements = await elementHelper().getAllElementsByCss(elementName);
  for(var i=0;i<elements.length;i++) {
    if(await elements[i].isDisplayed()) visibleElements.push(elements[i]);
  }
  await htmlHelper().clickElement(visibleElements[index]);
});

/* ---- click using javascript ---- */
When(/^I click the "([^"]*)" (?:button|link|icon|element|radio button) using javascript$/, async (elementName: string) => {
 const element: ElementFinder = await elementHelper().getElementByCss(elementName);
 await browser.executeScript('arguments[0].click()', element);
});

/* ---- eventually - addtional slow poll timer ---- */
When(/^the "([^"]*)" is eventually clickable$/, async (elementName: string) => {
  var EC = browser.ExpectedConditions;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await browser.wait(EC.elementToBeClickable(element), 5000);
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
When(/^I eventually click the "([^"]*)" (?:button|link|icon|element|radio button|check box)$/, async (elementName: string) => {
  var EC = browser.ExpectedConditions;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await browser.wait(EC.presenceOf(element), 5000);
    if (result) { element.click() }
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

/* ---- eventually - addtional slow poll timer ---- */
When(/^I eventually click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|radio button|check box)$/, async (elementPosition: string, elementName: string) => {
  var EC = browser.ExpectedConditions;
  const index = parseInt(elementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  try {
  return retryHelper().waitFor(async function() {
    let result = false;
    result = await browser.wait(EC.presenceOf(element), 5000);
    if (result) { element.click() }
    return result;
  });
  } catch (ex) {
    console.log('###### err:', ex);
    throw new Error(ex)
  }
});

