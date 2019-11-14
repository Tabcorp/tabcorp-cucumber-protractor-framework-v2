import { Container } from "inversify";

import { BASETYPES } from "../../../../src/e2e/IoC/base-types"
import { IComponentsWait } from "../../../../src/e2e/support/framework-helpers/interfaces/component-wait";
import { ICustomNavigationBehaviorHelper } from "../../../../src/e2e/support/framework-helpers/interfaces/custom-navigation-behavior-helper";
import { IWebElementLoader } from "../../../../src/e2e/support/framework-helpers/interfaces/web-element-interfaces";
import { ILogger } from "../../../../src/e2e/support/logger/logger";
import { IJurisdictionHelper } from "../../../../src/e2e/support/steps-helpers/interfaces/jurisdiction-helper";

import { FormAngularComponentsWait } from "../../../support/framework-helpers/implementations/custom/v2-framework/angular-components-helper";
import { FormWebElementLoader } from "../../../support/framework-helpers/implementations/custom/v2-framework/web-element-loader";
import { FormLogger } from "../../../support/logger/custom/v2-framework/logger";
import { FormJurisdictionHelper } from "../../../support/steps-helpers/custom/v2-framework/jurisdiction-helper";
import { FakeDataHelper } from "../../../support/steps-helpers/custom/v2-framework/fake-data-helper";
import { StoredElementDataHelper } from "../../../support/steps-helpers/custom/v2-framework/stored-element-data-helper";
import { StringHelper } from "../../../support/steps-helpers/custom/v2-framework/string-helper";
import { NumberHelper } from "../../../support/steps-helpers/custom/v2-framework/number-helper";
import { PageURLHelper } from "../../../support/steps-helpers/custom/v2-framework/page-url-helper";
import { FormCustomNavigationBehavior }  from "../../../support/framework-helpers/implementations/custom/v2-framework/custom-navigation-behavior-helper";

import { ICustomConfig } from "../../../support/framework-helpers/interfaces/custom/v2-framework/custom-config";
import { CUSTOMTYPES } from "./custom-types";


export const BaseCustomImplementationRegistration = (container: Container, customConfig: ICustomConfig): void => {

  // custom configuration - specific to Form
  container.bind<ICustomConfig>(CUSTOMTYPES.CustomConfig).toConstantValue(customConfig);

  // Framework classes
  container.bind<IComponentsWait>(BASETYPES.ComponentsWait).to(FormAngularComponentsWait);
  container.bind<ICustomNavigationBehaviorHelper>(BASETYPES.CustomNavigationBehaviorHelper).to(FormCustomNavigationBehavior).inSingletonScope();
  container.bind<IWebElementLoader>(BASETYPES.WebElementLoader).to(FormWebElementLoader).inSingletonScope();
  container.bind<ILogger>(BASETYPES.Logger).to(FormLogger);

  // custom step helper
  container.bind<IJurisdictionHelper>(BASETYPES.JurisdictionHelper).to(FormJurisdictionHelper);

};

export const CustomTypeRegistration = (container: Container) => {

  container.bind<FakeDataHelper>(CUSTOMTYPES.FakeDataHelper).to(FakeDataHelper);
  container.bind<StoredElementDataHelper>(CUSTOMTYPES.StoredElementDataHelper).to(StoredElementDataHelper);
  container.bind<StringHelper>(CUSTOMTYPES.StringHelper).to(StringHelper);
  container.bind<NumberHelper>(CUSTOMTYPES.NumberHelper).to(NumberHelper);
  container.bind<PageURLHelper>(CUSTOMTYPES.PageURLHelper).to(PageURLHelper);

};

