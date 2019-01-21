const { defineSupportCode } = require('cucumber');
import { IJurisdictionHelper } from "../support/steps-helpers/interfaces/jurisdiction-helper";
import { RegistrationIoC } from "../IoC/registration-ioc";
import { BASETYPES } from "../IoC/base-types";

const jurisdictionHelper = (): IJurisdictionHelper => RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);

defineSupportCode(function ({ When }) {

  When(/^I select the jurisdiction "([^"]*)"$/, async (state: string) => {
    await jurisdictionHelper().selectJurisdiction(state);
  });

});

