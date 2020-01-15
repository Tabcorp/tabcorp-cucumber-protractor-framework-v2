import { injectable, inject } from "inversify";
import { ElementFinder } from "protractor";

import { IComponentsWait } from "../../../../../src/e2e/support/framework-helpers/interfaces/component-wait";
import { WebElementHelper } from "../../../../../src/e2e/support/framework-helpers/implementations/web-element-helper";
import { HtmlHelper } from "../../../../../src/e2e/support/framework-helpers/implementations/html-helper";
import { BrowserWait } from "../../../../../src/e2e/support/framework-helpers/implementations/browser-wait";
import { IJurisdictionHelper } from "../../../../../src/e2e/support/steps-helpers/interfaces/jurisdiction-helper";
import { BASETYPES } from "../../../../../src/e2e/IoC/base-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";
import { ICustomNavigationBehaviorHelper } from "../../../../../src/e2e/support/framework-helpers/interfaces/custom-navigation-behavior-helper";
import { PageHelper } from "../../../../../src/e2e/support/framework-helpers/implementations/page-helper.js";
import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";

@injectable()
export class FormJurisdictionHelper implements IJurisdictionHelper {
  private readonly customConfig: ICustomConfig;
  private readonly customeNavigationBehaviorHelper: ICustomNavigationBehaviorHelper;
  private readonly pageHelper: PageHelper;
  // private readonly customConfig: ICustomConfig;
  // private readonly customConfig: ICustomConfig;
  // private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig,
              @inject(BASETYPES.WebElementHelper) elementHelper: WebElementHelper,
              @inject(BASETYPES.BrowserWait) BrowserWait: BrowserWait,
              @inject(BASETYPES.PageHelper) pageHelper: PageHelper,
              @inject(BASETYPES.CustomNavigationBehaviorHelper) customeNavigationBehaviorHelper: ICustomNavigationBehaviorHelper) {
    this.customConfig = customConfig;
    this.customeNavigationBehaviorHelper = customeNavigationBehaviorHelper;
    this.pageHelper = pageHelper;
  }

  public async selectJurisdiction(jurisdiction: string): Promise<void> {
    // select jurisdiction through UI
    throw new Error('not implemented')
  }

  public async isJurisdiction(jurisdiction: string): Promise<boolean> {
    // inspect page to determine if on the correct jurisdiction
    throw new Error('not implemented')
  }


  public async hardSetJurisdiction(jurisdiction: string): Promise<void> {
    const currentPage: string = this.customeNavigationBehaviorHelper.getCurrentPage();
    const currentURL = await this.customeNavigationBehaviorHelper.generateUrl(currentPage);
    const currentURLWithJurisdiction = currentURL + "?jurisdiction=" + jurisdiction;
    await this.pageHelper.navigateToUrl(currentURLWithJurisdiction);
  }
}
