import { browser, ElementFinder, $, ProtractorExpectedConditions, Config } from 'protractor';
import { IComponentsWait } from '../interfaces/component-wait';
import { ILogger } from '../../logger/logger';
import { TimeUtility } from './time-utility-helper';
import { injectable, inject } from "inversify";
import { BASETYPES } from '../../../IoC/base-types';
import { IRequiredConfig } from '../interfaces/required-config';
import { RetryHelper } from '../../steps-helpers/retry-helper'

@injectable()
export class BrowserWait {
  private readonly componentWaiter: IComponentsWait;
  private readonly logger: ILogger;
  private readonly until: ProtractorExpectedConditions;
  private readonly timeUtility: TimeUtility;
  private readonly retryHelper: RetryHelper;
  private readonly requiredConfig: IRequiredConfig;

  constructor(@inject(BASETYPES.ComponentsWait) componentWaiter: IComponentsWait,
              @inject(BASETYPES.Logger) logger: ILogger,
              @inject(BASETYPES.ProtractExpectedConds) until: ProtractorExpectedConditions,
              @inject(BASETYPES.TimeUtility) timeUtility: TimeUtility,
              @inject(BASETYPES.RetryHelper) retryHelper: RetryHelper,
              @inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig) {
    this.componentWaiter = componentWaiter;
    this.logger = logger;
    this.retryHelper = retryHelper;
    this.until = until;
    this.timeUtility = timeUtility;
    this.requiredConfig = requiredConfig;
  }

  public async waitElementToPresent(element: ElementFinder): Promise<void> {
    await browser.wait(this.until.presenceOf(element), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is not present`));
  }

  public async waitElementNotToPresent(element: ElementFinder): Promise<void> {
    await browser.wait(this.until.stalenessOf(element), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is still present`));
  }

  public async waitAllElementsToPresent(elements: ElementFinder[]): Promise<void> {
    for(const element of elements) {
      await browser.wait(this.until.presenceOf(element), browser.allScriptsTimeout,
                          this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is not present`));
    }
  }

  public async waitElementToBeClicked(element: ElementFinder): Promise<void> {
    await browser.wait(this.until.elementToBeClickable(element), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is not clickable`));
    await this.retryHelper.waitFor(() => element.click());
    await this.timeUtility.doActionAfterDelay(() => {}, this.requiredConfig.afterClickWaitDelay);
  }

  public async waitTextToBePresentInElement(element: ElementFinder, text: string): Promise<void> {
    await browser.wait(this.until.textToBePresentInElement(element, text), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Text "${text}" is not present in element ${await this.logger.getIdentifierFromWebElement(element)}`));
  }

  public async waitElementToBeVisible(element: ElementFinder): Promise<void> {
    await browser.wait(this.until.visibilityOf(element), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is not visible`));
  }

  async waitElementToNotBeVisible(element: ElementFinder): Promise<void> {
    await browser.wait(this.until.invisibilityOf(element), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is still visible`));
  }

  public async waitNavigateToUrlFinished(pageUrl: string, reloadSamePage: boolean): Promise<void> {

    const urlWithouQueryString: string = pageUrl.indexOf('?') > -1
                                          ? pageUrl.substring(0, pageUrl.indexOf('?'))
                                          : pageUrl;
    await browser.wait(this.until.urlContains(urlWithouQueryString), browser.allScriptsTimeout,
                        this.logger.generateErrorMessage(`Current Url does not contain "${pageUrl}"`));

    await this.componentWaiter.WaitForAllComponentsToLoad(reloadSamePage);
    await this.waitAnimationsToBeCompleted();
  }

  public async waitElementToBeEnabled(element: ElementFinder): Promise<void> {
    await browser.wait(async () => {
      return await element.getAttribute('disabled') == null;
    },
    browser.allScriptsTimeout,
    this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is still disabled`));
  }

  public async waitMultiWindowHandles(): Promise<void> {
    await browser.wait(async () => {
      return (await browser.getAllWindowHandles()).length > 1;
    }, browser.allScriptsTimeout, this.logger.generateErrorMessage(`Only one window handle`));
  }

  public async waitPageToBeScrolledToTop(): Promise<void> {
    await browser.wait(async () => {
      return await browser.executeScript(() => browser.params.scrollY === 0);
    }, browser.allScriptsTimeout, this.logger.generateErrorMessage(`Page is not scrolled to the top yet`));
  }

  public async waitElementToBeSelected(element: ElementFinder): Promise<void> {
    await browser.wait(async () => {
      return (await element.getAttribute('class')).includes('selected');
    },
    browser.allScriptsTimeout,
    this.logger.generateErrorMessage(`Element ${await this.logger.getIdentifierFromWebElement(element)} is still disabled`));
  }

  public async waitAnimationsToBeCompleted() {
    const animations: string[] = this.requiredConfig.animationClasses;
    animations.forEach(async animation => {
      await browser.wait(this.until.not(this.until.visibilityOf($(animation))), browser.allScriptsTimeout,
      this.logger.generateErrorMessage(`Animation '${animation}' is still visible`));
    });
  }

  private clickElement(element: ElementFinder): Promise<boolean> {

    const clickWaitMethod = (resolve: any) => {
      let hasBeenClicked: boolean = false;
      let interval = setInterval(() => {
        if (element != null) {
          if (!hasBeenClicked) {
            element.click().then(() => {
              hasBeenClicked = true;
              clearInterval(interval);
                resolve(true);
            }, () => {});
          }
        }
      }, 100);
    };

    const promise: Promise<boolean> = new Promise(clickWaitMethod);

    return promise;
  }
}

