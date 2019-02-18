import { IJurisdictionHelper } from "../support/steps-helpers/interfaces/jurisdiction-helper";
import { RegistrationIoC } from "../IoC/registration-ioc";
import { BASETYPES } from "../IoC/base-types";
import { When } from 'cucumber';

const jurisdictionHelper = (): IJurisdictionHelper => RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);

When(/^I select the jurisdiction "([^"]*)"$/, async (state: string) => {
  await jurisdictionHelper().selectJurisdiction(state);
});

