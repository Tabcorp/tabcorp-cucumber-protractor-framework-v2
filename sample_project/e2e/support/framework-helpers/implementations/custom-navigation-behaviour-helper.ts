import inversify = require('inversify');
import protractor = require('protractor');
import framework = require('tabcorp-cucumber-protractor-framework-v2');
import fs = require('fs');
import path = require('path');

@inversify.injectable()
export class PlayForPurposeCustomNavigationBehaviour implements framework.ICustomNavigationBehaviorHelper {
  private currentPage: string = '';

  private readonly requiredConfig;

  private _urls: { [pageUrl: string]: string };

  constructor(@inversify.inject(framework.BASETYPES.RequiredConfig) requiredConfig) {
    this.requiredConfig = requiredConfig;
  }

  public async urls(): Promise<{ [pageUrl: string]: string }> {
    if (this._urls == null) {
      this._urls = await this.loadUrlMap();
    }

    return this._urls;
  }

  public async loadUrlMap(): Promise<{ [pageUrl: string]: string }> {

    const urlPath: string = path.join(process.cwd(), this.requiredConfig.relativePaths.urls + '.json');
    const urlJsonObject = JSON.parse(fs.readFileSync(urlPath, 'utf8'));

    return urlJsonObject;
  }

  public async generateUrl(pageName: string, urlsMap?: { [pageUrl: string]: string }): Promise<string> {

    const pageNameKey = this.formatPageNameKey(pageName);
    const pageUrl: string = (urlsMap || await this.urls())[pageNameKey];

    if (pageUrl == null) {
      throw new Error('Page Unknown');
    }

    return protractor.browser.baseUrl + pageUrl;
  }

  public async triggerSystemSpecificBehaviorPreNavigation(): Promise<void> {}

  public async triggerSystemSpecificBehaviorPostNavigation(destinationUrl: string): Promise<void> {}

  getCurrentPage(): string {
    return this.currentPage;
  }

  setCurrentPage(pageName: string) {
    this.currentPage = this.formatPageNameKey(pageName);
  }

  private formatPageNameKey(pageName: string) {
    return pageName.replace(/ /g, '_').toLowerCase();
  }
}
