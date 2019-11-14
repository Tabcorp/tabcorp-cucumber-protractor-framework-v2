import { ElementArrayFinder, ElementFinder } from "protractor";
import { injectable, inject } from "inversify";

import { IDialogInteractionHelper } from "../../../../../src/e2e/support/steps-helpers/interfaces/dialog-interaction-helper";
import { WebElementHelper } from "../../../../../src/e2e/support/framework-helpers/implementations/web-element-helper";
import { HtmlHelper } from "../../../../../src/e2e/support/framework-helpers/implementations/html-helper";
import { BASETYPES } from "../../../../../src/e2e/IoC/base-types";

@injectable()
export class FormDialogInteractionHelper implements IDialogInteractionHelper {

  private readonly elementHelper: WebElementHelper;
  private readonly htmlHelper: HtmlHelper;

  constructor(@inject(BASETYPES.WebElementHelper) elementHelper: WebElementHelper,
              @inject(BASETYPES.HtmlHelper) htmlHelper: HtmlHelper) {
    this.htmlHelper = htmlHelper;
    this.elementHelper = elementHelper;
  }

  public async isAnyModalDialogOpen(expectPresence: boolean = false): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async dismissModalDialog(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async dismissModalDialogAttempt(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public cancelModalDialog(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public cancelModalDialogAttempt(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public acceptModalDialog(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async acceptModalDialogAttempt(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public isAnyPopUpOpen(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public popUpOpenList(): Promise<any[] | ElementArrayFinder> {
    throw new Error("Method not implemented.");
  }

  public dismissPopUp(webElement: ElementFinder): Promise<void> {
    throw new Error("Method not implemented.");
  }


}
