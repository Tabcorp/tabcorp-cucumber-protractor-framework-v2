import { injectable, inject } from "inversify";

import { IWebElementLoader } from '../../../../../../src/e2e/support/framework-helpers/interfaces/web-element-interfaces';
import { BASETYPES } from '../../../../../../src/e2e/IoC/base-types';
import { IRequiredConfig } from '../../../../../../src/e2e/support/framework-helpers/interfaces/required-config';

import { FormElement } from "./element-definition";
import { FormCustomNavigationBehavior } from './custom-navigation-behavior-helper';

import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class FormWebElementLoader implements IWebElementLoader {

  private _elementsMap: { [elementName: string]: FormElement } = {};
  private _elementSetLoaded: string[] = [];
y
  private readonly requiredConfig: IRequiredConfig;
  private readonly navigationHelper: FormCustomNavigationBehavior;

  constructor(@inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig,
              @inject(BASETYPES.CustomNavigationBehaviorHelper) navigationHelper: FormCustomNavigationBehavior) {
    this.requiredConfig = requiredConfig;
    this.navigationHelper = navigationHelper;
  }

  public async getElementLocator(elementName: string, params: string[] = [], elementsMap?: { [PageWithElementName: string]: FormElement}): Promise<string> {
    //console.log('#### form locator');
    const currentPage: string = this.navigationHelper.getCurrentPage();

    //console.log('### element name:', elementName);
    let elementKey = this.generateElementKey(currentPage, elementName);
    //console.log('### element key:', elementKey);
    //console.log('### map:', this._elementsMap);
    const theMap = (elementsMap || this._elementsMap);
    let elementSelector: string = theMap && theMap[elementKey] && theMap[elementKey].dataId;

    //Check by page
    //console.log('#### selector:', elementSelector);
    if (elementSelector == null) {
      this.loadElementMap(currentPage);
      //console.log('### map 1:', this._elementsMap);
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId
    }

    //Not in current page check common
    //console.log('#### selector 2:', elementSelector);
    if (elementSelector == null) {
      elementKey = this.generateElementKey('common', elementName);
      this.loadElementMap('common');
      //console.log('### map 2:', this._elementsMap);
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId
    }

    //finally check by passed in
    if (elementSelector == null) {
      elementSelector = `[data-id=${"'"+elementName+"'"}`
    }

    return elementSelector;
  }

  public async loadElementMap(pageId?: string): Promise<{ [elementName:string]: FormElement }> {

    if (!this._elementSetLoaded.some(setName => setName === pageId)) {
      this._elementSetLoaded.push(pageId);
      const elementsPath = path.join(process.cwd(), this.requiredConfig.relativePaths.elements, pageId + '.json');
      try {
        const elementsJsonObject = JSON.parse(fs.readFileSync(elementsPath, 'utf8'));
        const elementsKeyName = Object.keys(elementsJsonObject);
        for (let key of elementsKeyName) {
          const keyName = this.generateElementKey(pageId, key);
          const element: FormElement = {
            pageName: pageId,
            dataId: `[data-id=${"'"+elementsJsonObject[key]+"'"}`,
            name: key
          }
          this._elementsMap[keyName] = element;
        }
      } catch (e) {
        console.log("error output", e)
        throw new Error(`Unknown page elements: ${pageId}`);
      }
    }

    return this._elementsMap;
  }

  private generateElementKey(pageId: string, key: string) {
    //console.log("generateElementKey ", '[data-id='+(pageId + key).toLocaleLowerCase()+']');
    return (pageId + key).toLocaleLowerCase();
  }
}
