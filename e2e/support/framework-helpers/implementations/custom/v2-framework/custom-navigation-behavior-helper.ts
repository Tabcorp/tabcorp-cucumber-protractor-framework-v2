import { browser } from "protractor";
import { injectable, inject } from "inversify";

import { IRequiredConfig} from "../../../../../../src/e2e/support/framework-helpers/interfaces/required-config";
import { ICustomNavigationBehaviorHelper } from "../../../../../../src/e2e/support/framework-helpers/interfaces/custom-navigation-behavior-helper";
import { BASETYPES } from "../../../../../../src/e2e/IoC/base-types";

import { ICustomConfig } from "../../../interfaces/custom/v2-framework/custom-config";

import * as path from 'path';
import * as fs from 'fs';

@injectable()
export class FormCustomNavigationBehavior implements ICustomNavigationBehaviorHelper {
  private currentPage: string = '';

  private readonly requiredConfig: IRequiredConfig;

  private _urls: { [pageUrl:string]: string };

  constructor(@inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig) {
    this.requiredConfig = requiredConfig;
  }

  public async urls(): Promise<{ [pageUrl:string]: string }> {

    if (this._urls == null) {
      this._urls = await this.loadUrlMap();
    }

    return this._urls;
  }

  public async loadUrlMap(): Promise<{ [pageUrl:string]: string }> {

    const urlPath: string = path.join(process.cwd(), this.requiredConfig.relativePaths.urls + '.json');
    const urlJsonObject = JSON.parse(fs.readFileSync(urlPath, 'utf8'));

    return urlJsonObject;
  }

  public async generateUrl(pageName: string, urlsMap?: { [pageUrl:string]: string }): Promise<string> {

    let pageNameKey = this.formatPageNameKey(pageName);
    let pageUrl: string = (urlsMap || await this.urls())[pageNameKey];

    if (pageUrl == null) {
      throw new Error('Page Unknown');
    }

    return browser.baseUrl + pageUrl;
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
    return pageName.replace(/ /g, "_").toLowerCase();
  }
}
