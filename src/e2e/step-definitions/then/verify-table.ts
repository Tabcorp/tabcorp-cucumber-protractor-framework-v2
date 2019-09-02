import { expect } from 'chai';
import { TableDefinition, Then } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { StringManipulationHelper } from '../../support/steps-helpers/string-manipulation-helper';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const stringManipulationHelper = (): StringManipulationHelper => RegistrationIoC.getContainer().get<StringManipulationHelper>(BASETYPES.StringManipulationHelper);

Then(/^the "([^"]*)" table contains the following:$/, async (elementName: string, dataTable: TableDefinition) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  return element.getText().then(function (text) {
    dataTable.hashes().forEach(function (row) {
      for (const key in row) {
        var cucumber_text = stringManipulationHelper().replaceLineBreaks(row[key]);
        var ui_text = stringManipulationHelper().replaceLineBreaks(text);
        expect(ui_text).to.deep.include(cucumber_text);
      }
    });
  });
});

Then(/^the "([^"]*)" table does not contain the following:$/, async (elementName: string, dataTable: TableDefinition) => {
  const element: ElementFinder = await elementHelper().getElementByCss(elementName);
  return element.getText().then(function (text) {
    dataTable.hashes().forEach(function (row) {
      for (const key in row) {
        var cucumber_text = stringManipulationHelper().replaceLineBreaks(row[key]);
        var ui_text = stringManipulationHelper().replaceLineBreaks(text);
        expect(ui_text).to.not.deep.include(cucumber_text);
      }
    });
  });
});