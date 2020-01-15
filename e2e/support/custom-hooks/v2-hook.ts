import { BeforeAll, Before, After } from 'cucumber';
import { browser, protractor } from 'protractor';
import * as requestPromise from "request-promise";
import { expect } from 'chai';

import { RegistrationIoC } from '../../../src/e2e/IoC/registration-ioc';
import { BASETYPES } from '../../../src/e2e/IoC/base-types';
import { IRequiredConfig } from '../../../src/e2e/support/framework-helpers/interfaces/required-config';
import { RequiredConfig } from '../../../src/e2e/support/framework-helpers/implementations/required-config';
import { CUSTOMTYPES } from "../../IoC/custom/v2-framework/custom-types";

import { BaseCustomImplementationRegistration, CustomTypeRegistration } from '../../IoC/custom/v2-framework/custom-registration';

const requiredConfig = (): IRequiredConfig => RegistrationIoC.getContainer().get<IRequiredConfig>(BASETYPES.RequiredConfig);

const BROWSER_WINDOW = Object.freeze({
  MOBILE_WIDTH: process.env.MOBILE_UI_WIDTH || 375,
  MOBILE_HEIGHT: process.env.MOBILE_UI_HEIGHT || 667,
  TABLET_WIDTH: process.env.TABLET_UI_WIDTH || 1024,
  TABLET_HEIGHT: process.env.TABLET_UI_HEIGHT || 768,
  DESKTOP_WIDTH: process.env.DESKTOP_UI_WIDTH || 1600,
  DESKTOP_HEIGHT: process.env.DESKTOP_UI_HEIGHT || 1200,
  SCREENSHOT_HEIGHT: process.env.SCREENSHOT_UI_HEIGHT || 7000
});

BeforeAll(async function () {
  RegistrationIoC.addCustomRegistrationMethod({ callback: BaseCustomImplementationRegistration, args: [browser.params.customConfig] });
  RegistrationIoC.addCustomRegistrationMethod({ callback: CustomTypeRegistration });

  RegistrationIoC.triggerPublicRegistration(protractor, browser.params.requiredConfig);
});

Before(async function (scenario) {
  const requiredConfig: IRequiredConfig = new RequiredConfig(browser.params.requiredConfig);
  setupForAngularApp(requiredConfig.isAngularApp);
});

After(async function (scenario) {
  const current_scenario = scenario;
  await clearCache();
});

const setupForAngularApp = (isAngularApp: boolean) => {
  browser.ignoreSynchronization = true;
};

const setupBrowserResolution = (scenario) => {
  const tags          = scenario.pickle.tags.map(tag => tag.name);
  const isMobile      = tags.includes('@mobile');
  const isTablet      = tags.includes('@tablet');
  const isDesktop     = tags.includes('@desktop');

  if (isMobile) {
    setWindowSize(BROWSER_WINDOW.MOBILE_WIDTH, BROWSER_WINDOW.MOBILE_HEIGHT);
  } else if (isTablet) {
    setWindowSize(BROWSER_WINDOW.TABLET_WIDTH, BROWSER_WINDOW.TABLET_HEIGHT);
  } else if (isDesktop) {
    setWindowSize(BROWSER_WINDOW.DESKTOP_WIDTH, BROWSER_WINDOW.DESKTOP_HEIGHT);
  }
};

const clearCache = () => {

  function clearStorage() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  return browser.executeScript(clearStorage);
};

const setWindowSize = function (width, height) {
  browser.driver.manage().window().setSize(parseInt(width), parseInt(height));
};
