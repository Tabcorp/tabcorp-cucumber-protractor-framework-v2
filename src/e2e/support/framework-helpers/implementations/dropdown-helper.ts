import { injectable, inject } from 'inversify';
import { BASETYPES } from '../../../IoC/base-types';
import { HtmlHelper } from './html-helper';

@injectable()
export class DropdownHelper {

  private readonly htmlHelper: HtmlHelper;

  constructor(
    @inject(BASETYPES.HtmlHelper) htmlHelper: HtmlHelper) {
    this.htmlHelper = htmlHelper;
  }

  public async getSelectedOptionValue(element) {
    const selectedElementValue = await this.htmlHelper.getAttribute(element, 'value');
    return selectedElementValue;
  }
}
