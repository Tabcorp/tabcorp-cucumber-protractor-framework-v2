// import { RegistrationIoC } from "../../e2e/IoC/registration-ioc";
// import { BaseCustomImplementationRegistration } from "../../e2e/IoC/custom/the-lott/custom-registration";
// import { IRequiredConfig } from "../../e2e/support/framework-helpers/interfaces/required-config";
// import { ICustomConfig } from "../../e2e/support/framework-helpers/interfaces/custom/custom-config";
// import { BASETYPES } from "../../e2e/IoC/base-types";
// import { should, expect } from "chai";
// import { ProtractorExpectedConditions, Ptor, ProtractorBrowser } from "protractor";
// import { BrowserWait } from "../../e2e/support/framework-helpers/implementations/browser-wait";
// import { HtmlHelper } from "../../e2e/support/framework-helpers/implementations/html-helper";
// import { PageHelper } from "../../e2e/support/framework-helpers/implementations/page-helper";
// import { ScriptHelper } from "../../e2e/support/steps-helpers/script-helper";
// import { FileUtility } from "../../e2e/support/framework-helpers/implementations/file-utility";
// import { TimeUtility } from "../../e2e/support/framework-helpers/implementations/time-utility-helper";
// import { WebElementHelper } from "../../e2e/support/framework-helpers/implementations/web-element-helper";
// import { StringGeneratorHelper } from "../../e2e/support/steps-helpers/string-generator-helper";
// import { IComponentsWait } from "../../e2e/support/framework-helpers/interfaces/component-wait";
// import { ICustomNavigationBehaviorHelper } from "../../e2e/support/framework-helpers/interfaces/custom-navigation-behavior-helper";
// import { IWebElementLoader } from "../../e2e/support/framework-helpers/interfaces/web-element-interfaces";
// import { ILogger } from "../../e2e/support/logger/logger";
// import { IDialogInteractionHelper } from "../../e2e/support/steps-helpers/interfaces/dialog-interaction-helper";
// import { IJurisdictionHelper } from "../../e2e/support/steps-helpers/interfaces/jurisdiction-helper";
// import { ILoginProcessHelper } from "../../e2e/support/steps-helpers/interfaces/login-process-helper";
// import { CUSTOMTYPES } from "../../e2e/IoC/custom/the-lott/custom-types";
// import { LogginLevel } from "../../e2e/support/framework-helpers/interfaces/loggin-interfaces";
//
// describe('IoC Registration and Resolution', () => {
//   const requiredConfig: IRequiredConfig = {
//     retry: {
//       default: {
//         attempt: 3,
//         delay: 140
//       },
//       expectedNotFound: {
//         attempt: 2,
//         delay: 25
//       }
//     },
//     afterClickWaitDelay: 50,
//     relativePaths: {
//       urls: "/mappings/urls.yaml",
//       elements: "/mappings/elements.yaml",
//       scripts: "/scripts/"
//     },
//     disableTransitions: true,
//     isAngularApp: true,
//     defaultStartPage: 'stratPage',
//     animationClasses: [".spinner-circular", ".spinner-path", ".success-tick", ".success", ".fadeScaleDown", ".fadeScaleDown .fa-inverse", ".fail-cross", ".fail", ".fadeScaleShake", ".fadeScaleShake .fa-inverse"]
//   };
//   const customConfig: ICustomConfig = {
//     loginPromptCheckUpDelay: 5,
//     logginLevel: LogginLevel.Info
//   };
//   const protract: Ptor = new Ptor();
//
//   before(() => {
//     protract.ExpectedConditions = new ProtractorExpectedConditions({} as ProtractorBrowser);
//     RegistrationIoC.addCustomRegistrationMethod({ callback: BaseCustomImplementationRegistration, args: [customConfig]});
//     RegistrationIoC.triggerPublicRegistration(protract, requiredConfig);
//   });
//
//   describe('BaseType class registration', () => {
//     it('Should register an instance of the base config with the value from the IConfig passed', () => {
//       const config = RegistrationIoC.getContainer().get<IRequiredConfig>(BASETYPES.RequiredConfig);
//
//       should().exist(config);
//       should().exist(config.retry);
//       should().exist(config.retry.default);
//       expect(config.retry.default.attempt).to.equal(3);
//       expect(config.retry.default.delay).to.equal(140);
//       should().exist(config.retry.expectedNotFound);
//       expect(config.retry.expectedNotFound.attempt).to.equal(2);
//       expect(config.retry.expectedNotFound.delay).to.equal(25);
//
//       should().exist(config.relativePaths);
//       expect(config.relativePaths.elements).to.equal('/mappings/elements.yaml');
//       expect(config.relativePaths.urls).to.equal('/mappings/urls.yaml');
//       expect(config.relativePaths.scripts).to.equal('/scripts/');
//
//       should().exist(config.disableTransitions);
//       expect(config.disableTransitions).to.equal(true);
//
//       should().exist(config.afterClickWaitDelay);
//       expect(config.afterClickWaitDelay).to.equal(50);
//     });
//
//     it('Framework provided implementations of the BaseTypes should exist', () => {
//       const until: ProtractorExpectedConditions = RegistrationIoC.getContainer().get<ProtractorExpectedConditions>(BASETYPES.ProtractExpectedConds);
//       const browserWait: BrowserWait = RegistrationIoC.getContainer().get<BrowserWait>(BASETYPES.BrowserWait);
//       const htmlHelper: HtmlHelper = RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
//       const pageHelper: PageHelper = RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);
//       const fileUtility: FileUtility = RegistrationIoC.getContainer().get<FileUtility>(BASETYPES.FileUtility);
//       const timeUtility: TimeUtility = RegistrationIoC.getContainer().get<TimeUtility>(BASETYPES.TimeUtility);
//       const webElementHelper: WebElementHelper = RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
//
//       const scriptHelper: ScriptHelper = RegistrationIoC.getContainer().get<ScriptHelper>(BASETYPES.ScriptHelper);
//       const stringHelper: StringGeneratorHelper = RegistrationIoC.getContainer().get<StringGeneratorHelper>(BASETYPES.StringGeneratorHelper);
//
//       should().exist(browserWait);
//       should().exist(htmlHelper);
//       should().exist(pageHelper);
//       should().exist(fileUtility);
//       should().exist(timeUtility);
//       should().exist(webElementHelper);
//       should().exist(scriptHelper);
//       should().exist(stringHelper);
//       should().exist(until);
//     });
//
//     it('Custom implementations of the BaseTypes Interface should exist', () => {
//       const componentWait: IComponentsWait = RegistrationIoC.getContainer().get<IComponentsWait>(BASETYPES.ComponentsWait);
//       const navHelper: ICustomNavigationBehaviorHelper = RegistrationIoC.getContainer().get<ICustomNavigationBehaviorHelper>(BASETYPES.CustomNavigationBehaviorHelper);
//       const logger: ILogger = RegistrationIoC.getContainer().get<ILogger>(BASETYPES.Logger);
//       const dialogHelper: IDialogInteractionHelper = RegistrationIoC.getContainer().get<IDialogInteractionHelper>(BASETYPES.DialogInteractionHelper);
//       const Jurisdication: IJurisdictionHelper = RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);
//       const loginHelper: ILoginProcessHelper = RegistrationIoC.getContainer().get<ILoginProcessHelper>(BASETYPES.LoginProcessHelper);
//       const webElementLoader: IWebElementLoader = RegistrationIoC.getContainer().get<IWebElementLoader>(BASETYPES.WebElementLoader);
//
//       should().exist(componentWait);
//       should().exist(navHelper);
//       should().exist(logger);
//       should().exist(dialogHelper);
//       should().exist(Jurisdication);
//       should().exist(loginHelper);
//       should().exist(webElementLoader);
//     });
//   });
//
//   describe('CustomTypes class registration', () => {
//     it('Should register an instance of the custom config with the value from the IConfig passed', () => {
//       const config = RegistrationIoC.getContainer().get<ICustomConfig>(CUSTOMTYPES.CustomConfig);
//
//       should().exist(config);
//       should().exist(config.loginPromptCheckUpDelay);
//       expect(config.loginPromptCheckUpDelay).to.equal(5);
//     });
//   });
// });
