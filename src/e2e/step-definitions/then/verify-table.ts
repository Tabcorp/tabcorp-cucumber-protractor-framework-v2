import { assert } from 'chai';
const { defineSupportCode } = require('cucumber');
import { TableDefinition } from 'cucumber';
import { WebElementHelper } from '../../support/framework-helpers/implementations/web-element-helper';
import { HtmlHelper } from '../../support/framework-helpers/implementations/html-helper';
import { RegistrationIoC } from '../../IoC/registration-ioc';
import { BASETYPES } from '../../IoC/base-types';
import { IComponentsWait } from '../../support/framework-helpers/interfaces/component-wait';

const elementHelper = (): WebElementHelper => RegistrationIoC.getContainer().get<WebElementHelper>(BASETYPES.WebElementHelper);
const htmlHelper = (): HtmlHelper => RegistrationIoC.getContainer().get<HtmlHelper>(BASETYPES.HtmlHelper);
const componentWait = (): IComponentsWait => RegistrationIoC.getContainer().get<IComponentsWait>(BASETYPES.ComponentsWait);

defineSupportCode(function ({ Then }) {

  Then(/^the "([^"]*)" table contains the following:$/, async (elementName: string, dataTable: TableDefinition) => {
    assert(false, 'STEP NOT IMPLEMENTED');
  });

  Then(/^the "([^"]*)" table does not contain the following:$/, async (elementName: string, dataTable: TableDefinition) => {
    assert(false, 'STEP NOT IMPLEMENTED');
  });

});
