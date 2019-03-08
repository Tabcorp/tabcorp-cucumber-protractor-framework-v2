import { browser } from 'protractor';
import { PageHelper } from '../support/framework-helpers/implementations/page-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { When } from 'cucumber';

const pageHelper = (): PageHelper => RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);

When(/^I navigate to the "([^"]*)" page$/, async (pageName: string) => {
  await pageHelper().navigateToPage(pageName);
});

When(/^I refresh the page$/, async () => {
  const currentUrl = await browser.getCurrentUrl();
  await pageHelper().navigateToUrl(currentUrl);
});

When(/^I navigate to the URL "([^"]*)"$/, async (pageUrl: string) => {
  await pageHelper().navigateToUrl(pageUrl);
});
