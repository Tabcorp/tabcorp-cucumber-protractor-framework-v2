import { expect } from 'chai';
import { ElementFinder } from 'protractor';
import { Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" element$/, async (mainElementPosition: string, mainElementName: string, negate: string, subElementName: string) => {
  const index: number = parseInt(mainElementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, index);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" element$/, async (mainElementPosition: string, mainElementName: string, mainElementSelectorModifiers: string, negate: string, subElementName: string) => {
  const mainParams: string[] = mainElementSelectorModifiers.split(',');
  const index: number = parseInt(mainElementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, index, mainParams);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" for specific "([^"]*)" element$/, async (mainElementPosition: string, mainElementName: string, negate: string, subElementName: string, subElementSelectorModifiers: string) => {
  const subParams: string[] = subElementSelectorModifiers.split(',');
  const index: number = parseInt(mainElementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, index, null, subParams);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" for specific "([^"]*)" element$/, async (mainElementPosition: string, mainElementName: string, mainElementSelectorModifiers: string, negate: string, subElementName: string, subElementSelectorModifiers: string) => {
  const mainParams: string[] = mainElementSelectorModifiers.split(',');
  const subParams: string[] = subElementSelectorModifiers.split(',');
  const index: number = parseInt(mainElementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, true, index, mainParams, subParams);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([0-9]+)" "([^"]*)" (?:element|elements)$/, async (mainElementPosition: string, mainElementName: string, expectedCount: string, subElementName: string) => {
  const index: number = parseInt(mainElementPosition.replace(/^\D+/g, ''), 10) - 1;
  const elements: ElementFinder[] = await elementHelper().getAllElementsInElementByCss(mainElementName, subElementName, index);
  expect(elements.length).to.equal(parseInt(expectedCount));
});

Then(/^the "([^"]*)" containing the text "([^"]*)" has a "([^"]*)" element$/, async (mainElementName: string, mainElementText: string, subElementName: string) => {
  const mainElement = await elementHelper().getElementByCssContainingText(mainElementName, mainElementText);
  const element: ElementFinder = await elementHelper().getElementInWebElementByCss(mainElement, subElementName);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(true);
});

/* ---- should be present / should not be present ---- */
Then(/^the "([^"]*)" (?:button|link|icon|element) should( not)? be present$/, async (elementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, 0, !negate);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be present$/, async (elementName: string, selectorModifiers: string, negate: boolean) => {
  const params: string[] = selectorModifiers.split(',');
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, 0, !negate, params);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be present$/, async (elementIndex: string, elementName: string, negate: boolean) => {
  const index: number = parseInt(elementIndex.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index, !negate);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "([^"]*)" element within the "([^"]*)" should( not)? be present$/, async (subElementName: string, mainElementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, !negate);
  const isPresent: boolean = await htmlHelper().isElementPresent(element);
  expect(isPresent).to.equal(!negate);
});