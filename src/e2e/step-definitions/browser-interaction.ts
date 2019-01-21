const { defineSupportCode } = require('cucumber');
import { browser, ElementFinder } from 'protractor';
import { HtmlHelper } from '../support/framework-helpers/implementations/html-helper';
import { WebElementHelper } from '../support/framework-helpers/implementations/web-element-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);

defineSupportCode(function ({ When }) {

  /* ---- Move/click MOUSE ---- */
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
  /**
   * https://stackoverflow.com/questions/34562061/webdriver-click-vs-javascript-click
   * Step definitions such as the following will need to be used to click on elements
   * that the web driver can't.
   */
  When(/^I move the mouse "([^"]*)" to the right and "([^"]*)" down from the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element$/, async (x: string, y: string, elementPosition: string, elementName: string) => {
    const index = parseInt(elementPosition, 10) - 1;
    const element: ElementFinder = await elementHelper().getElementByCss(elementName, index);
    browser.actions().mouseMove(element, { x: parseInt(x, 10), y: parseInt(y, 10) }).perform();
  });

  When(/^(I have )?clicked$/, async (iHaveClicked: string) => {
    browser.actions().click().perform();
  });

  /* ---- SCROLL ---- */
  When(/^I scroll down (\d+)$/, async (scrollAmount: string) => {
    await browser.executeAsyncScript(`browser.params.scrollTo(0,'${scrollAmount}');`);
  });

  When(/^I scroll to the bottom of the page$/, async () => {
    await browser.executeAsyncScript('browser.params.scroll(0, document.body.offsetHeight)');
  });

  When(/^I scroll to the top of the page$/, async () => {
    await browser.executeAsyncScript('browser.params.scroll(document.body.offsetHeight, 0)');
  });

  When(/^I scroll down (\d+) within the "([^"]*)"$/, async (scrollAmount: string, elementName: string) => {
    const element: ElementFinder = await elementHelper().getElementByCss(elementName);
    // await browser.executeAsyncScript(`document.querySelector('${elementSelector}').scrollTop=${scrollAmount}`);
    await htmlHelper().scrollElementToView(element);
  });

  /* ---- TAB ---- */
  When(/^I switch to the "(new open|1st|2nd|3rd|[0-9]+th)" tab$/, async (tabToSwitchIndex: number) => {
    // new open = last tab in the browser
    throw new Error('STEP NOT IMPLEMENTED');
  });

  /***************************************************************************************/
  // DEPREC: TO DEBUG ONLY, should NOT be used
  When(/^I wait "([^"]*)" seconds?$/, async (waitSeconds: string) => {
    await browser.sleep(parseInt(waitSeconds, 10) * 1000);
  });

});
