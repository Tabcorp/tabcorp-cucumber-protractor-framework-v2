import cucumber = require('cucumber');
import protractor = require('protractor');
import framework = require('tabcorp-cucumber-protractor-framework-v2');

const retryHelper = (): framework.RetryHelper => framework.RegistrationIoC.getContainer().get<framework.RetryHelper>(framework.BASETYPES.RetryHelper);
const elementHelper = (): framework.WebElementHelper => framework.RegistrationIoC.getContainer().get<framework.WebElementHelper>(framework.BASETYPES.WebElementHelper);
const htmlHelper = (): framework.HtmlHelper => framework.RegistrationIoC.getContainer().get<framework.HtmlHelper>(framework.BASETYPES.HtmlHelper);

cucumber.Then(/^the "([^"]*)" eventually contains the text "([^"]*)"$/, async (elementName: string, expectedElementText: string) => {
  const element: protractor.ElementFinder = await elementHelper().getElementByCss(elementName);
  return retryHelper().waitFor(async () => {
    let result = false;
    protractor.browser.waitForAngular();
    result = await (htmlHelper().getElementText(element) as any).should.eventually.contain(expectedElementText);
    return result;
  });
});
