import { ElementFinder } from 'protractor';
import { When } from 'cucumber';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);


When(/^I click the "([^"]*)" (?:button|link|icon|element|radio button)$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
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

// TO REWRITE - MAKES NO SENSE
When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)$/, async (elementPosition: string, elementName: string) => {
  const index = parseInt(elementPosition, 10) - 1;
  let element: ElementFinder = null;
  if (elementName === "Fast Select Game" || elementName === "Clear Game") {
    const params: string[] = [index.toString()];
    element = await elementHelper().getElementByCss(elementName, null, true, params);
  } else {
    element = await elementHelper().getElementByCss(elementName, index);
  }

  await htmlHelper().clickElement(element);
});

// CUSTOM
// When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) "([^"]*)" times with a delay of "([^"]*)" seconds before each click$/, async (elementIndex: string, elementName: string, elementCount: number, clickDelay: number) => {
//   const index = parseInt(elementIndex, 10) - 1;
//   const elements = await htmlHelper.getAllElementsByCss(htmlHelper.getElementLocator(elementName));
//   for (let j = 0; j < elementCount; j++) {
//     await browser.sleep(clickDelay * 1000);
//     await htmlHelper.clickElement(elements[index]);
//   }
// });

// // DEPREC
// When(/^I click the "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, async (elementName: string, elementText: string, expectedUrl: string) => {
//   const element: ElementFinder = await elementHelper.getElementByCssContainingText(elementName, elementText);
//   await htmlHelper.clickElement(element);
//   await browserWait.waitNavigateToUrlFinished(expectedUrl);
// });

// // DEPREC
// When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" by text "([^"]*)" I should be directed to the "([^"]*)" page$/, async (elementPosition: string, elementName: string, elementText: string, expectedUrl: string) => {
//   const index = parseInt(elementPosition, 10) - 1;
//   const element: ElementFinder = await elementHelper.getElementByCssContainingText(elementName, elementText, index);
//   await htmlHelper.clickElement(element);
//   await browserWait.waitNavigateToUrlFinished(expectedUrl);
// });

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

// DEPREC
// When(/^I click the "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, async (elementName: string, expectedUrl: string) => {
//   await browserWait.waitPageToBeScrolledToTop();
//   const element: ElementFinder = await elementHelper.getElementByCss(elementName);
//   await htmlHelper.clickElement(element);
//   await browserWait.waitNavigateToUrlFinished(expectedUrl);
// });

// TODO: FIX
// When(/^I click and select the "([^"]*)" element with the text "([^"]*)"$/, async (elementName: string, elementText: string) => {
//   const element: ElementFinder = await elementHelper.getElementByCss(elementName);
//   await browserWait.waitElementToPresent(element);
//   await browserWait.waitAnimationsToBeCompleted();

//   // browser.takeScreenshot().then((png) => {
//   //   let stream = fs.createWriteStream(`C:/output/screenshot_.png`);
//   //   stream.write(new Buffer(png, 'base64'));
//   //   stream.end();
//   // });
//   const webElement = await elementHelper.getElementByCssContainingText(elementName, elementText);
//   await htmlHelper.clickAndSelectElement(webElement);
// });

// DEPREC
// When(/^I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link) I should be directed to the "([^"]*)" page$/, async (elementPosition: string, elementName: string, expectedUrl: string) => {
//   const index = parseInt(elementPosition, 10) - 1;
//   const element: ElementFinder = await elementHelper.getElementByCss(elementName, index);
//   await htmlHelper.clickElement(element);
//   await browserWait.waitNavigateToUrlFinished(expectedUrl);
// });

