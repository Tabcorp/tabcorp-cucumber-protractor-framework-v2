import { expect } from 'chai';
import { ElementFinder } from 'protractor';
const { defineSupportCode } = require('cucumber');
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

defineSupportCode(function ({ Then }) {

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
    expect(elements.length).to.equal(elementCount);
  });

  Then(/^I can see at least "(\d+)" "([^"]*)" (?:buttons|links|icons|elements)$/, async (minElementCount: number, elementName: string) => {
    const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName);
    expect(elements.length).to.gte(minElementCount);
  });
  Then(/^I can see at least "(\d+)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)$/, async (minElementCount: number, elementName: string, selectorModifiers: string) => {
    const params: string[] = selectorModifiers.split(',');
    const elements: ElementFinder[] = await elementHelper().getAllElementsByCss(elementName, true, params);
    expect(elements.length).to.gte(minElementCount);
  });

  Then(/^I can see more than "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)$/, async (expectedElementCount: number, elementName: string) => {
    const elements: ElementFinder[] =  await elementHelper().getAllElementsByCss(elementName);
    expect(elements.length).to.be.gt(expectedElementCount);
  });
  Then(/^I can see more than "(\d*)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)$/, async (expectedElementCount: number, elementName: string, selectorModifiers: string) => {
    const params: string[] = selectorModifiers.split(',');
    const elements: ElementFinder[] =  await elementHelper().getAllElementsByCss(elementName, true, params);
    expect(elements.length).to.be.gt(expectedElementCount);
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

});
