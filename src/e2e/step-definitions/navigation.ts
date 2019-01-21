const { defineSupportCode } = require('cucumber');
import { browser } from 'protractor';
import { PageHelper } from '../support/framework-helpers/implementations/page-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';

const pageHelper = (): PageHelper => RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);

defineSupportCode(function ({ When }) {

  When(/^I navigate to the "([^"]*)" page$/, async (pageName: string) => {
    await pageHelper().navigateToPage(pageName);
  });

  When(/^I refresh the page$/, async () => {
    const currentUrl = await browser.getCurrentUrl();
    await pageHelper().navigateToUrl(currentUrl);
  });

});
