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

  private readonly requiredConfig: IRequiredConfig;
  private readonly navigationHelper: FormCustomNavigationBehavior;

  constructor(@inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig,
              @inject(BASETYPES.CustomNavigationBehaviorHelper) navigationHelper: FormCustomNavigationBehavior) {
    this.requiredConfig = requiredConfig;
    this.navigationHelper = navigationHelper;
  }

  public async getElementLocator(elementName: string, params: string[] = [], elementsMap?: { [PageWithElementName: string]: FormElement}): Promise<string> {
    const currentPage: string = this.navigationHelper.getCurrentPage();
    let elementKey = this.generateElementKey(currentPage, elementName);
    const theMap = (elementsMap || this._elementsMap);
    let elementSelector: string = theMap && theMap[elementKey] && theMap[elementKey].dataId;

    //Check by page
    if (elementSelector == null) {
      this.loadElementMap(currentPage);
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId
    }

    //Not in current page check common
    if (elementSelector == null) {
      elementKey = this.generateElementKey('common', elementName);
      this.loadElementMap('common');
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId
    }

    //finally check by passed in
    if (elementSelector == null) {
      elementSelector = elementName;
    }

    return this.generateDataTestId(elementSelector, params)
  }

  private generateDataTestId(genericTestId: string, params: string[]) {


      let testId: string = genericTestId;
      if (params != null) {
        for (const value of params) {
          testId = testId + value
        }
      }
      return `[data-id=${"'"+testId+"']"}`;
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
            dataId: elementsJsonObject[key],
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
    return (pageId + key).toLocaleLowerCase();
  }

}
