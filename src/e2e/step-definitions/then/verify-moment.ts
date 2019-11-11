import { Then } from 'cucumber';
import { expect } from 'chai';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { MomentHelper } from '../../support/framework-helpers/implementations/moment-helper';
import { DropdownHelper } from '../../support/framework-helpers/implementations/dropdown-helper';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const momentHelper = (): MomentHelper => RegistrationIoC.getContainer().get<MomentHelper>(BASETYPES.MomentHelper);
const dropdownHelper = (): DropdownHelper => RegistrationIoC.getContainer().get<DropdownHelper>(BASETYPES.DropdownHelper);

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the time "([^"]*)"$/, async (elementPosition, elementName, expectedElementText) => {
  let index = parseInt(elementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element = await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);

  //convert BNE time to local time
  const expectedTime = momentHelper().convertBneToLocal(expectedElementText);

  expect(elementText).to.include(expectedTime);
});

Then(/^the "([^"]*)" contains the current month and year$/, async (elementName) => {
  const element = await elementHelper().getElementByCss(elementName);
  const elementText = await htmlHelper().getElementText(element);
  const currentMonthAndYear = momentHelper().getCurrentMonthAndYear();

  expect(elementText).to.include(currentMonthAndYear);
});

Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the current year$/, async (elementPosition, elementName) => {
  let index = parseInt(elementPosition.replace(/^\D+/g, ''), 10) - 1;
  const element = await elementHelper().getElementByCss(elementName, index);
  const elementText = await htmlHelper().getElementText(element);
  const currentYear = momentHelper().getCurrentYear();

  expect(elementText).to.include(currentYear);
});

Then(/^the selected option in "([^"]*)" contains the current month$/, async (elementName) => {
  const element = await elementHelper().getElementByCss(elementName);
  let selectedElementValue = await dropdownHelper().getSelectedOptionValue(element);
  if (!isNaN(Number(selectedElementValue))) {
    selectedElementValue = momentHelper().formatMonth(selectedElementValue);
  }
  const currentMonth = momentHelper().getCurrentMonth();

  expect(selectedElementValue).to.include(currentMonth);
});

Then(/^the selected option in "([^"]*)" contains the current year$/, async (elementName) => {
  const element = await elementHelper().getElementByCss(elementName);
  const selectedElementValue = await dropdownHelper().getSelectedOptionValue(element);
  const currentYear = momentHelper().getCurrentYear();

  expect(selectedElementValue).to.include(currentYear);
});