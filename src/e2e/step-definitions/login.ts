import { ILoginProcessHelper } from '../support/steps-helpers/interfaces/login-process-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';
import { Given, When } from 'cucumber';

const loginHelper = (): ILoginProcessHelper => RegistrationIoC.getContainer().get<ILoginProcessHelper>(BASETYPES.LoginProcessHelper);

Given(/^I am not logged in/, async () => {
  if (await loginHelper().isUserLoggedIn()) {
    await loginHelper().logout();
  }
});

Given(/^I am logged in with username "([^"]*)" and password "([^"]*)"$/, async (usernameValue: string, password: string) => {
  const isDialogOpen: boolean = await loginHelper().isLoginPromptPresent();
  if (!isDialogOpen) {
    await loginHelper().bringUpLoginPrompt();
  }

  await loginHelper().enterLoginDetails(usernameValue, password);
});

When(/^I sign out$/, async () => {
  if (await loginHelper().isUserLoggedIn()) {
    await loginHelper().logout();
  }
});

When(/^I fill the username "([^"]*)" and password "([^"]*)" in the login prompt$/, async (usernameValue: string, password: string) => {
  await loginHelper().enterLoginDetails(usernameValue, password);
});

