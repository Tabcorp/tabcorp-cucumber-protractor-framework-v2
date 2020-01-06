import { browser, ElementFinder } from 'protractor';
import { When } from 'cucumber';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

When(/^I mouse over (the )?"([^"]*)"$/, async (theArticle: string, elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().mouseOver(element);
});

When(/^I hover over (the )?"([^"]*)"$/, async (theArticle: string, elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await htmlHelper().hoverOver(element);
});

When(/^I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"$/, async (elementIndex: string, elementName: string) => {
  const index = parseInt(elementIndex, 10) - 1;
  const elements = await elementHelper().getElementByCss(elementName, index);
  await htmlHelper().hoverOver(elements[index]);
});

When(/^I move the mouse "([^"]*)" to the right and "([^"]*)" down from the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element$/, async (x: string, y: string, elementPosition: string, elementName: string) => {
  const index = parseInt(elementPosition, 10) - 1;
  const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
  browser.actions().mouseMove(element, { x: parseInt(x, 10), y: parseInt(y, 10) }).perform();
});

When(/^I scroll to the "([^"]*)" element$/, async (elementName: string) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  await browser.actions().mouseMove(element).perform();
});

When(/^I wait "([^"]*)" seconds?$/, async (waitSeconds: string) => {
  await browser.sleep(parseInt(waitSeconds, 10) * 1000);
});
