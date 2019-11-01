import { expect, should } from 'chai';
import { Given, When } from 'cucumber';
import { browser } from 'protractor';
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { RetryHelper } from "../../../support/steps-helpers/custom/v2-framework/retry_helper"

chai.should();
chai.use(chaiAsPromised);

import { WebElementHelper } from 'tabcorp-cucumber-protractor-framework-v2';
import { BrowserWait } from 'tabcorp-cucumber-protractor-framework-v2';
import { RegistrationIoC } from 'tabcorp-cucumber-protractor-framework-v2';
import { BASETYPES } from 'tabcorp-cucumber-protractor-framework-v2';
import { ICustomNavigationBehaviorHelper } from "tabcorp-cucumber-protractor-framework-v2";
import { IJurisdictionHelper } from "tabcorp-cucumber-protractor-framework-v2";
import { PageURLHelper } from "../../../support/steps-helpers/custom/v2-framework/page-url-helper"

import { CUSTOMTYPES } from "../../../IoC/custom/v2-framework/custom-types";
import { Container } from 'inversify';

const pageURLHelper = (): PageURLHelper => RegistrationIoC.getContainer().get<PageURLHelper>(CUSTOMTYPES.PageURLHelper);
const customNavigationHelper = (): ICustomNavigationBehaviorHelper => RegistrationIoC.getContainer().get<ICustomNavigationBehaviorHelper>(BASETYPES.CustomNavigationBehaviorHelper);
const jurisdictionHelper = (): IJurisdictionHelper => RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);
const browserWait = (): BrowserWait => RegistrationIoC.getContainer().get<BrowserWait>(BASETYPES.BrowserWait);
const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const retryHelper = (): RetryHelper => RegistrationIoC.getContainer().get<RetryHelper>(CUSTOMTYPES.RetryHelper);

Given(/^I am on the "([^"]*)" page$/, async (pageName: string) => {
  await customNavigationHelper().setCurrentPage(pageName);
});

When(/^I am directed to the "([^"]*)" page$/, async (pageName: string) => {
  const definedPageURL = await pageURLHelper().getDefinedPageURL(pageName);
  await customNavigationHelper().setCurrentPage(pageName);
  return retryHelper().waitFor(async function() {
    let result = false;
    browser.waitForAngular();
    result = await browser.getCurrentUrl().should.eventually.contain(definedPageURL);
    return result;
  });
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
