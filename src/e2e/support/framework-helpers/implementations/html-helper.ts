import { ElementFinder, browser } from 'protractor';
import { BrowserWait } from './browser-wait';
import { WebElementHelper } from './web-element-helper';
import { injectable, inject } from "inversify";
import { BASETYPES } from '../../../IoC/base-types';

@injectable()
export class HtmlHelper {
  private readonly browserWait: BrowserWait;
  private readonly elementHelper: WebElementHelper;

  constructor(@inject(BASETYPES.BrowserWait) browserWait: BrowserWait,
              @inject(BASETYPES.WebElementHelper) elementHelper: WebElementHelper) {
    this.browserWait = browserWait;
    this.elementHelper = elementHelper;
  }

  public async isElementTextPresent(webElement: ElementFinder, attributeType: string, attribute: string): Promise<boolean> {
    if (webElement == null) {
      return false;
    }
    const attributes = await webElement.getAttribute(attributeType);
    return await attributes.indexOf(attribute) !== -1;
  }

  public async hoverOver(webElement: ElementFinder): Promise<void> {
    if (webElement != null) {
      await browser.actions().mouseMove(webElement).perform();
    }
  }

  public async mouseOver(webElement: ElementFinder): Promise<void> {
    if (webElement != null) {
      await browser.actions().mouseMove(webElement).perform();
    }
  }

  public async inputValue(webElement: ElementFinder, inputValue: string): Promise<void> {
    if (webElement != null) {
      await this.clearElement(webElement);
      await webElement.sendKeys(inputValue);
    }
  }

  public async selectStartingWithValue(webElement: ElementFinder, value: string): Promise<void> {
    const options = await this.elementHelper.getAllElementsByTagName('option', webElement);

    for(let option of options) {
      let text = await option.getText();
      if (text.toLowerCase().startsWith(value.toLowerCase())) {
        await this.browserWait.waitElementToBeClicked(option);
        return;
      }
    }
  }

  public async selectValue(webElement: ElementFinder, value: string): Promise<void> {
    const options = await this.elementHelper.getAllElementsByTagName('option', webElement);

    for(let option of options) {
      let text = await option.getText();
      if (text.toLowerCase() === value.toLowerCase()) {
        await this.browserWait.waitElementToBeClicked(option);
        return;
      }
    }
  }

  public async clickElement(webElement: ElementFinder): Promise<void> {
    await this.browserWait.waitElementToBeVisible(webElement);
    await this.browserWait.waitElementToBeClicked(webElement);
    await this.browserWait.waitAnimationsToBeCompleted();
  }

  public async countElements(elements: ElementFinder[]): Promise<number> {
    return await elements.length;
  }

  public async getElementText(webElement: ElementFinder): Promise<string> {
    await this.browserWait.waitElementToBeVisible(webElement);
    return await webElement.getText();
  }

  public async isElementPresent(webElement: ElementFinder): Promise<boolean> {
    return webElement != null && await webElement.isPresent();
  }

  public async isAnyElementPresent(webElements: ElementFinder[]): Promise<boolean> {
    let presencePromises = webElements.map(element => this.isElementPresent(element));
    let presences: boolean[] = await Promise.all(presencePromises);
    return presences.some(presence => presence === true);
  }

  public async areAllElementPresent(webElements: ElementFinder[]): Promise<boolean> {
    let presencePromises = webElements.map(element => this.isElementPresent(element));
    let presences: boolean[] = await Promise.all(presencePromises);
    return presences.every(presence => presence === true);
  }

  public async isElementDisplayed(webElement: ElementFinder): Promise<boolean> {
    return webElement != null && await webElement.isDisplayed();
  }

  public async areNElementDisplayed(webElements: ElementFinder[], expectedCount: number, exactCount: boolean = false): Promise<boolean> {
    let displayPromises = webElements.map(element => this.isElementDisplayed(element));
    let displays: boolean[] = await Promise.all(displayPromises);
    const visibleElements = displays.filter(display => display === true);
    return exactCount ? visibleElements.length >= expectedCount : visibleElements.length === expectedCount;
  }

  public async areAllElementDisplayed(webElements: ElementFinder[]): Promise<boolean> {
    let displayPromises = webElements.map(element => this.isElementDisplayed(element));
    let displays: boolean[] = await Promise.all(displayPromises);
    return displays.every(display => display === true);
  }

  public async isElementEnabled(webElement: ElementFinder): Promise<boolean> {
    return webElement != null && await webElement.isEnabled();
  }

  public async isElementSelected(webElement: ElementFinder): Promise<boolean> {
    return webElement != null && await webElement.isSelected();
  }

  public async getAttribute(webElement: ElementFinder, attributeName: string): Promise<string> {
    return webElement != null && await webElement.getAttribute(attributeName);
  }

  public async clearElement(webElement: ElementFinder): Promise<void> {
    // await this.browserWait.waitElementToPresent(webElement);
    await webElement.clear();
  }

  public async clickAndSelectElement(webElement: ElementFinder): Promise<void> {
    await this.clickElement(webElement);
    await this.browserWait.waitElementToBeSelected(webElement);
  }

  //https://stackoverflow.com/questions/39399477/protractor-scroll-into-view-not-working
  public async scrollElementToView(element: ElementFinder): Promise<void> {
    browser.controlFlow().execute(function() {
        browser.executeScript('arguments[0].scrollIntoView(true)', element.getWebElement());
    });
  }

  public async getElementTextByIndex(elementName: string, index): Promise<string> {
    const element: ElementFinder = await this.elementHelper.getElementByCss(elementName, index);
    await this.browserWait.waitElementToBeVisible(element);
    return await this.getElementText(element);
  }
}
