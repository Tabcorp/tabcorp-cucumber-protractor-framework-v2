import { IJurisdictionHelper } from "../../support/steps-helpers/interfaces/jurisdiction-helper";
import { RegistrationIoC } from "../../IoC/registration-ioc";
import { BASETYPES } from "../../IoC/base-types";
import { Then } from "cucumber";
import { expect } from "chai";

const jurisdictionHelper = (): IJurisdictionHelper => RegistrationIoC.getContainer().get<IJurisdictionHelper>(BASETYPES.JurisdictionHelper);

Then(/^I should be in the jurisdiction "([^"]*)"$/, async (state: string) => {
  const isJurisdiction = await jurisdictionHelper().isJurisdiction(state);
  expect(isJurisdiction).to.be.true;
});
