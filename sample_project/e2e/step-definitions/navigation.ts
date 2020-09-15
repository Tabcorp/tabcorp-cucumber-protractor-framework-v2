import { browser } from 'protractor';
import cucumber = require('cucumber');
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import framework = require('tabcorp-cucumber-protractor-framework-v2');
const e2econfig = require('../config/e2e.conf.json');

import { CUSTOMTYPES } from "../ioc/custom-types";
import { PageURLHelper } from "../support/step-helpers/page-url-helper"

const pageURLHelper = (): PageURLHelper => framework.RegistrationIoC.getContainer().get(CUSTOMTYPES.PageURLHelper);
const customNavigationHelper = (): framework.ICustomNavigationBehaviorHelper => framework.RegistrationIoC.getContainer().get(framework.BASETYPES.CustomNavigationBehaviorHelper);
const retryHelper = (): framework.RetryHelper => framework.RegistrationIoC.getContainer().get(framework.BASETYPES.RetryHelper);

cucumber.setDefaultTimeout(e2econfig.testsConfigurationVariables.allScriptsTimeout);

cucumber.Given(/^I am on the "([^"]*)" page$/, async (pageName: string) => {
  await customNavigationHelper().setCurrentPage(pageName);
});

cucumber.When(/^I am directed to the "([^"]*)" page$/, async (pageName: string) => {
  const definedPageURL = await pageURLHelper().getDefinedPageURL(pageName);
  await customNavigationHelper().setCurrentPage(pageName);
  return retryHelper().waitFor(async function() {
    let result = false;
    browser.waitForAngular();
    result = await browser.getCurrentUrl().should.eventually.contain(definedPageURL);
    return result;
  });
});
