import { When } from 'cucumber';
import { ScriptHelper } from '../support/steps-helpers/script-helper';
import { RegistrationIoC } from '../IoC/registration-ioc';
import { BASETYPES } from '../IoC/base-types';

const scriptHelper = (): ScriptHelper => RegistrationIoC.getContainer().get<ScriptHelper>(BASETYPES.ScriptHelper);

When(/^I setup the site for "([^"]*)"$/, async (script: string) => {
  await scriptHelper().runScriptFromFile(script);
});
