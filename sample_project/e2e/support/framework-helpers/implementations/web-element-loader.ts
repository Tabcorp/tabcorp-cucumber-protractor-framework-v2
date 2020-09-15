import element = require('./element-definition');
import inversify = require('inversify');
import framework = require('tabcorp-cucumber-protractor-framework-v2');
import fs = require('fs');
import path = require('path');

@inversify.injectable()
export class PlayForPurposeWebElementLoader implements framework.IWebElementLoader {

  private _elementsMap: { [elementName: string]: element.PlayForPurposeElement } = {};
  private _elementSetLoaded: string[] = [];

  private readonly requiredConfig;
  private readonly navigationHelper;

  constructor(@inversify.inject(framework.BASETYPES.RequiredConfig) requiredConfig,
              @inversify.inject(framework.BASETYPES.CustomNavigationBehaviorHelper) navigationHelper) {
    this.requiredConfig = requiredConfig;
    this.navigationHelper = navigationHelper;
  }

  public async getElementLocator(elementName: string, params: string[] = [], elementsMap?: { [PageWithElementName: string]: element.PlayForPurposeElement }): Promise<string> {
    const currentPage: string = this.navigationHelper.getCurrentPage();

    let elementKey = this.generateElementKey(currentPage, elementName);

    const theMap = (elementsMap || this._elementsMap);
    let elementSelector: string = theMap && theMap[elementKey] && theMap[elementKey].dataId;

    // Check by page
    if (elementSelector == null) {
      this.loadElementMap(currentPage);
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId;
    }

    // Not in current page check common
    if (elementSelector == null) {
      elementKey = this.generateElementKey('common', elementName);
      this.loadElementMap('common');
      elementSelector = (this._elementsMap[elementKey] || {} as any).dataId;
    }

    // finally check by passed in
    if (elementSelector == null) {
      elementSelector = `[data-id=${"'" + elementName + "'"}`;
    }

    return elementSelector;
  }

  public async loadElementMap(pageId?: string): Promise<{ [elementName: string]: element.PlayForPurposeElement }> {

    if (!this._elementSetLoaded.some(setName => setName === pageId)) {
      this._elementSetLoaded.push(pageId);
      const elementsPath = path.join(process.cwd(), this.requiredConfig.relativePaths.elements, pageId + '.json');
      try {
        const elementsJsonObject = JSON.parse(fs.readFileSync(elementsPath, 'utf8'));
        const elementsKeyName = Object.keys(elementsJsonObject);
        for (const key of elementsKeyName) {
          const keyName = this.generateElementKey(pageId, key);
          const element = {
            pageName: pageId,
            dataId: `[data-id=${"'" + elementsJsonObject[key] + "'"}`,
            name: key
          }
          this._elementsMap[keyName] = element;
        }
      } catch (e) {
        console.log('error output', e)
        throw new Error(`Unknown page elements: ${pageId}`);
      }
    }

    return this._elementsMap;
  }

  private generateElementKey(pageId: string, key: string) {
    return (pageId + key).toLocaleLowerCase();
  }
}
