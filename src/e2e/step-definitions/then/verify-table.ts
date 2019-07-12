import { assert } from 'chai';
import { Then } from 'cucumber';
import { TableDefinition } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { IComponentsWait } from '../../support/framework-helpers/interfaces/component-wait';
import { StringManipulationHelper } from '../../support/steps-helpers/string-manipulation-helper';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const componentWait = (): IComponentsWait => RegistrationIoC.getContainer().get<IComponentsWait>(BASETYPES.ComponentsWait);
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
