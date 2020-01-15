
import { element, by, ElementArrayFinder, ElementFinder } from 'protractor';
import { IWebElementLoader } from '../interfaces/web-element-interfaces';
import { ProtractorLocator } from 'protractor/built/locators';
import { Locator } from 'selenium-webdriver';
import { TimeUtility } from './time-utility-helper';
import { injectable, inject } from "inversify";
import { BASETYPES } from '../../../IoC/base-types';
import { IRequiredConfig } from '../interfaces/required-config';

@injectable()
export class WebElementHelper {

  private readonly webElementLoader: IWebElementLoader;
  private readonly timeUtilities: TimeUtility;
  private readonly requiredConfig: IRequiredConfig;

  constructor(@inject(BASETYPES.WebElementLoader) webElementLoader: IWebElementLoader,
              @inject(BASETYPES.TimeUtility) timeUtilities: TimeUtility,
              @inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig) {
    this.webElementLoader = webElementLoader;
    this.timeUtilities = timeUtilities;
    this.requiredConfig = requiredConfig;
  }

  public async getElementByCss(elementName: string, index: number = 0, expectPresence: boolean = true, nameParams: string[] = [])
    : Promise<ElementFinder> {

    let list = await this.getAllElementsByCss(elementName, expectPresence, nameParams);
    return this.getNthElementInList(list, index);
  }

  public async getAllElementsByCss(elementName: string, expectPresence: boolean = true, nameParams: string[] = [])
    : Promise<ElementFinder[]> {

    const elementLocator: string = await this.webElementLoader.getElementLocator(elementName, nameParams);
    const locatorSelector: Locator = by.css(elementLocator);
    let elements = await this.retrieveElements(locatorSelector, expectPresence);

    return elements;
  }

  public async getElementByCssContainingText(elementName: string, elementText: string, index: number = 0, expectPresence: boolean = true,nameParams: string[] = [])
    : Promise<ElementFinder> {
    let list = await this.getAllElementsByCssContainingText(elementName, elementText, expectPresence, nameParams);
    return this.getNthElementInList(list, index);
  }
  public async getAllElementsByCssContainingText(elementName: string, elementText: string, expectPresence: boolean = true, nameParams: string[] = [])
    : Promise<ElementFinder[]> {

    const elementLocator: string = await this.webElementLoader.getElementLocator(elementName, nameParams);
    const locatorSelector: ProtractorLocator = by.cssContainingText(elementLocator, elementText);

    let elements = await this.retrieveElements(locatorSelector, expectPresence);

    return elements;
  }

  public async getElementInElementByCss(parentElementName: string, elementName: string, index: number = 0, expectPresence: boolean = true,
    parentElementIndex: number = 0, parentNameParams: string[] = [], nameParams: string[] = [])
    : Promise<ElementFinder> {

      let list = await this.getAllElementsInElementByCss(parentElementName, elementName, parentElementIndex, expectPresence, parentNameParams, nameParams);
      return this.getNthElementInList(list, index);
  }
  public async getAllElementsInElementByCss(parentElementName: string, elementName: string, parentElementIndex: number = 0,
    expectPresence: boolean = true, parentNameParams: string[] = [], nameParams: string[] = [])
    : Promise<ElementFinder[]> {

    let parentElement: ElementFinder = await this.getElementByCss(parentElementName, parentElementIndex, true, parentNameParams);
    const elementLocator: string = await this.webElementLoader.getElementLocator(elementName, nameParams);
    const locatorSelector: Locator = by.css(elementLocator);
    let elements = await this.retrieveElements(locatorSelector, expectPresence, parentElement);
    return elements;
  }

  public async getElementInWebElementByCss(parentWebElement: ElementFinder, elementName: string, index: number = 0, expectPresence: boolean = true,nameParams: string[] = [])
    : Promise<ElementFinder> {
    let list = await this.getAllElementsInWebElementByCss(parentWebElement, elementName, expectPresence, nameParams);
    return this.getNthElementInList(list, index);
  }
  public async getAllElementsInWebElementByCss(parentWebElement: ElementFinder, elementName: string, expectPresence: boolean = true, nameParams: string[] = [])
    : Promise<ElementFinder[]> {
    const elementLocator: string = await this.webElementLoader.getElementLocator(elementName, nameParams);
    const locatorSelector: Locator = by.css(elementLocator);
    let elements = await this.retrieveElements(locatorSelector, expectPresence, parentWebElement);

    return elements;
  }

  public async getAllElementsByTagName(tagName: string, baseElement: ElementFinder = null, expectPresence: boolean = true)
    : Promise<ElementFinder[]> {
    const elementToSearch = (baseElement || element);
    const locator: Locator = by.tagName(tagName)
    return await this.retrieveElements(locator, expectPresence, elementToSearch as ElementFinder);
  }

  public async getElementById(elementId: string, expectPresence: boolean = true)
    : Promise<ElementFinder> {
    const locatorSelector: Locator = by.id(elementId);
    let list = await this.retrieveElements(locatorSelector, expectPresence);

    return this.getNthElementInList(list, 0);
  }

  private async retrieveElements(locatorSelector: Locator | ProtractorLocator, expectPresence: boolean, parentElement?: ElementFinder): Promise<ElementFinder[]> {
    const retryAttempt: number = 1 + (expectPresence ? this.requiredConfig.retry.default.attempt : this.requiredConfig.retry.expectedNotFound.attempt);
    const retryDelay: number = expectPresence ? this.requiredConfig.retry.default.delay : this.requiredConfig.retry.expectedNotFound.delay;

    let elements;

    elements = await this.timeUtilities.doAsyncActionWithRetry<ElementFinder[]>(
                          this.tryOnceArray,
                          () =>  (parentElement || element).all(locatorSelector),
                          () => [element(by.id(`[NOT-FOUND] ${locatorSelector}`))],
                          retryAttempt,
                          retryDelay);

    return Promise.resolve(elements);
  }

  private async tryOnceArray(finderCallback: () => ElementArrayFinder): Promise<ElementFinder[]> {
    const webElement: ElementArrayFinder = finderCallback();

    const elementCount: number = await webElement.count();
    if (elementCount > 0) {
      return webElement;
    }
    return new Promise<ElementArrayFinder>((resolve, reject) => {
      reject(`elements "${webElement.locator().toString()}" not found`);
    });
  }

  private getNthElementInList(elementList: ElementFinder[], index: number) {

    const webElement: ElementFinder = elementList && elementList.length > index
                                    ? elementList[index]
                                    : element(by.id(`[NOT-FOUND] [index=${index}] [element=${elementList}]`));
    return webElement;
  }
}



