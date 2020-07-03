import { expect } from 'chai';
import { ElementFinder } from 'protractor';
import { Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

/* ---- should be enabled / should not be enabled ---- */
Then(/^the "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled$/, async (elementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const isEnabled: boolean = await htmlHelper().isElementEnabled(element);
  expect(isEnabled).to.equal(!negate);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled$/, async (elementName: string, selectorModifiers: string, negate: boolean) => {
  let element: ElementFinder = null;
  const params: string[] = selectorModifiers.split(',');
  element = await elementHelper().getElementByCss(elementName, 0, true, params);
  const isEnabled: boolean = await htmlHelper().isElementEnabled(element);
  expect(isEnabled).to.equal(!negate);
});

Then(/^the "([^"]*)" (?:checkbox|radio button) should( not)? be selected$/, async (elementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  const isSelected: boolean = await htmlHelper().isElementSelected(element);
  expect(isSelected).to.equal(!negate);
});

Then(/^the "([^"]*)" (?:checkbox|radio button) within the "([^"]*)" should( not)? be selected$/, async (subElementName: string, mainElementName: string, negate: boolean) => {
  const element: ElementFinder = await elementHelper().getElementInElementByCss(mainElementName, subElementName, 0, !negate);
  const isSelected: boolean = await htmlHelper().isElementSelected(element);
  expect(isSelected).to.equal(!negate);
});

Then(/^the "([^"]*)" for specific "([^"]*)" (?:checkbox|radio button) should( not)? be selected$/, async (elementName: string, selectorModifiers: string, negate: boolean) => {
  const params: string[] = selectorModifiers.split(',');
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, 0, !negate, params);
  const isPresent: boolean = await htmlHelper().isElementSelected(element);
  expect(isPresent).to.equal(!negate);
});

Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:checkbox|radio button) should( not)? be selected$/, async (elementIndex: string, elementName: string, negate: boolean) => {
  const index: number = parseInt(elementIndex.replace(/^\D+/g, ''), 10) - 1;
  const element: ElementFinder =  await elementHelper().getElementByCss(elementName, index, !negate);
  const isPresent: boolean = await htmlHelper().isElementSelected(element);
  expect(isPresent).to.equal(!negate);
});