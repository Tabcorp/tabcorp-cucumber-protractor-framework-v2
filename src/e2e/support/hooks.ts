import { After, Before, AfterAll, setDefaultTimeout, BeforeAll } from 'cucumber';
import { browser, protractor } from 'protractor';
import { PageHelper } from './framework-helpers/implementations/page-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { ILoginProcessHelper } from './steps-helpers/interfaces/login-process-helper';
import { IRequiredConfig } from './framework-helpers/interfaces/required-config';
import { RequiredConfig } from './framework-helpers/implementations/required-config';

const pageHelper = (): PageHelper => RegistrationIoC.getContainer().get<PageHelper>(BASETYPES.PageHelper);
const loginProcessHelper = (): ILoginProcessHelper => RegistrationIoC.getContainer().get<ILoginProcessHelper>(BASETYPES.LoginProcessHelper);
const requiredConfig = (): IRequiredConfig => RegistrationIoC.getContainer().get<IRequiredConfig>(BASETYPES.RequiredConfig);


BeforeAll(async function () {
  const requiredConfig: IRequiredConfig = new RequiredConfig(browser.params.requiredConfig);
  setDefaultTimeout(browser.allScriptsTimeout);
  browser.manage().window().maximize();
});


After({ tags: '@logged-in' }, async function () {
  await loginProcessHelper().hardLogoutAndClearCache();
  this.needToRefresh = true;
});

After(async function() {
  if (!!this.needToRefresh) {
    await pageHelper().refreshCurrentPage();
  }
})
