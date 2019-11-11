import { expect } from 'chai';
import { Then } from 'cucumber';
import { ILoginProcessHelper } from '../../support/steps-helpers/interfaces/login-process-helper';
import { BASETYPES } from '../../IoC/base-types';
import { RegistrationIoC } from '../../IoC/registration-ioc';

const loginHelper = (): ILoginProcessHelper => RegistrationIoC.getContainer().get<ILoginProcessHelper>(BASETYPES.LoginProcessHelper);

/* ---- logged-in status ---- */
Then(/^I am logged out$/, async () => {
  const isUserLoggedIn = await loginHelper().isUserLoggedIn();
  expect(isUserLoggedIn).to.be.false;
});