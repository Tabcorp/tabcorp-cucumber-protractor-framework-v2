import { expect } from 'chai';
import { browser } from 'protractor';
import { Then } from 'cucumber';
import { PageHelper } from '../../support/framework-helpers/implementations/page-helper';
import { BASETYPES } from '../../IoC/base-types';
import { RegistrationIoC } from '../../IoC/registration-ioc';

const pageHelper = (): PageHelper => RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);

/* ---- page / url ---- */
Then(/^I should be on the "([^"]*)" page$/, async (expectedPageName: string) => {
  const expectedUrl = await pageHelper().generateUrl(expectedPageName);
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl.includes(expectedUrl), `| current: ${currentUrl} expected: ${expectedUrl} |`).to.be.true;
});

Then(/^I see the "([^"]*)" page title$/, async (expectedTitle: string) => {
  const title = await browser.driver.getTitle();
  expect(title.includes(expectedTitle)).to.be.true;
});

Then(/^the current url contains "([^"]*)"$/, async (expectedUrl: string) => {
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl.includes(expectedUrl)).to.be.true;
});

Then(/^a new tab is open with the url containing "([^"]*)"$/, async (expectedUrl: string) => {
  await browser.params.browserWait.waitMultiWindowHandles();
  const windowHandles = await browser.getAllWindowHandles();
  await browser.switchTo().window(windowHandles[1]);
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl).contain(expectedUrl);
});

Then(/^a new tab will be opened with the url containing "([^"]*)"$/, async (expectedUrl) => {
  const windowHandles = await browser.getAllWindowHandles();
  await browser.switchTo().window(windowHandles[1]);
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl).contain(expectedUrl);
});
