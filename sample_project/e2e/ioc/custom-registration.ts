import framework = require('tabcorp-cucumber-protractor-framework-v2');
import navigation_behaviour_helper = require('../support/framework-helpers/implementations/custom-navigation-behaviour-helper');
import web_element_loader = require('../support/framework-helpers/implementations/web-element-loader');
import logger = require('../support/framework-helpers/implementations/logger');
import angular_components_helper = require('../support/framework-helpers/implementations/angular-components-helper');

import { Container } from "inversify";
import { CUSTOMTYPES } from "./custom-types";
import { ICustomConfig } from "../support/framework-helpers/interfaces/custom-config";
import { PageURLHelper } from "../support/step-helpers/page-url-helper";

export const BaseCustomImplementationRegistration = (container, customConfig): void => {

  // custom configuration - specific to Keno
  container.bind(CUSTOMTYPES.CustomConfig).toConstantValue(customConfig);

  // Framework classes
  container.bind(framework.BASETYPES.ComponentsWait).to(angular_components_helper.PlayForPurposeAngularComponentsWait);
  container.bind(framework.BASETYPES.CustomNavigationBehaviorHelper).to(navigation_behaviour_helper.PlayForPurposeCustomNavigationBehaviour).inSingletonScope();
  container.bind(framework.BASETYPES.WebElementLoader).to(web_element_loader.PlayForPurposeWebElementLoader).inSingletonScope();
  container.bind(framework.BASETYPES.Logger).to(logger.PlayForPurposeLogger);
};

export const CustomTypeRegistration = (container, Container) => {

  // custom classes
  container.bind(CUSTOMTYPES.PageURLHelper).to(PageURLHelper);
};
