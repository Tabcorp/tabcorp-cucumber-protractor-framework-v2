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

