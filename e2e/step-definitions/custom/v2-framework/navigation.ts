import { expect, should } from 'chai';
import { Given, When } from 'cucumber';
import { browser } from 'protractor';
import * as chai from "chai";
chai.should();

import { WebElementHelper } from '../../../../src/e2e/support/framework-helpers/implementations/web-element-helper';
import { BrowserWait } from '../../../../src/e2e/support/framework-helpers/implementations/browser-wait';
import { RegistrationIoC } from '../../../../src/e2e/IoC/registration-ioc';
import { BASETYPES } from '../../../../src/e2e/IoC/base-types';
import { ICustomNavigationBehaviorHelper } from "../../../../src/e2e/support/framework-helpers/interfaces/custom-navigation-behavior-helper";
import { IJurisdictionHelper } from "../../../../src/e2e/support/steps-helpers/interfaces/jurisdiction-helper";
import { PageHelper } from '../../../../src/e2e/support/framework-helpers/implementations/page-helper';
import { PageURLHelper } from "../../../support/steps-helpers/custom/v2-framework/page-url-helper"
import { CUSTOMTYPES } from "../../../IoC/custom/v2-framework/custom-types";
import { Container } from 'inversify';

const pageURLHelper = (): PageURLHelper => RegistrationIoC.getContainer().get<PageURLHelper>(CUSTOMTYPES.PageURLHelper);
const customNavigationHelper = (): ICustomNavigationBehaviorHelper => RegistrationIoC.getContainer().get<ICustomNavigationBehaviorHelper>(BASETYPES.CustomNavigationBehaviorHelper);
const jurisdictionHelper = (): IJurisdictionHelper => RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);
const browserWait = (): BrowserWait => RegistrationIoC.getContainer().get<BrowserWait>(BASETYPES.BrowserWait);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const pageHelper = (): PageHelper => RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);

Given(/^I am on the "([^"]*)" page$/, async (pageName: string) => {
  await pageHelper().navigateToPage(pageName);
});

When(/^I am directed to the "([^"]*)" page$/, async (pageName: string) => {
  const definedPageURL = await pageURLHelper().getDefinedPageURL(pageName);
  await customNavigationHelper().setCurrentPage(pageName);
});

When(/^I am directed to the "([^"]*)" dialog$/, async (pageName: string) => {
  await customNavigationHelper().setCurrentPage(pageName);
});

When(/^I hard refresh the page$/, async () => {
  await browser.driver.navigate().refresh()
});

When(/^I set the (?:page|dialog|modal) to "([^"]*)"$/, async (pageName: string) => {
  await customNavigationHelper().setCurrentPage(pageName);
});
