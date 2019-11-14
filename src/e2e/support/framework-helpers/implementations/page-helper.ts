import { browser } from 'protractor';
import { ICustomNavigationBehaviorHelper } from '../interfaces/custom-navigation-behavior-helper';
import { BrowserWait } from './browser-wait';
import { injectable, inject } from "inversify";
import { BASETYPES } from '../../../IoC/base-types';

@injectable()
export class PageHelper {

  private readonly browserWait: BrowserWait;
  private readonly customNavigationBehavior: ICustomNavigationBehaviorHelper

  constructor(@inject(BASETYPES.BrowserWait) browserWait: BrowserWait,
              @inject(BASETYPES.CustomNavigationBehaviorHelper) customNavigationBehavior: ICustomNavigationBehaviorHelper) {
    this.browserWait = browserWait;
    this.customNavigationBehavior = customNavigationBehavior;
  }

  public async navigateToPage(pageName: string): Promise<void> {
    const url = await this.generateUrl(pageName);
    this.customNavigationBehavior.setCurrentPage(pageName);
    await this.navigateToUrl(url);
  }


  public async refreshCurrentPage(): Promise<void> {
    await browser.refresh();

    const pageUrl = await this.generateUrl(this.customNavigationBehavior.getCurrentPage());
    await this.browserWait.waitNavigateToUrlFinished(pageUrl, true);
  }

  public async navigateToUrl(pageUrl: string): Promise<void> {
    const reloadSamePage: boolean = await this.isOnRequestedUrl(pageUrl);
    await browser.get(pageUrl);

    this.customNavigationBehavior.triggerSystemSpecificBehaviorPostNavigation(pageUrl);

    await this.browserWait.waitNavigateToUrlFinished(pageUrl, reloadSamePage);
  }

  public async generateUrl(pageName: string): Promise<string> {
    return this.customNavigationBehavior.generateUrl(pageName);
  }

  public async isOneWebSitePage(specificPageName?: string): Promise<boolean> {
    const urlToMatch: string = specificPageName != null
                                ? await this.generateUrl(specificPageName)
                                : browser.baseUrl;

    return this.isOnRequestedUrl(urlToMatch);
  }

  private async isOnRequestedUrl(requestedUrl: string): Promise<boolean> {
    const currentUrl: string = await browser.getCurrentUrl();

    return currentUrl.startsWith(requestedUrl);
  }
}
