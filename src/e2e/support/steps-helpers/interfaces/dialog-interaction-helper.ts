import { ElementFinder, ElementArrayFinder } from "protractor";

export interface IDialogInteractionHelper {
  isAnyModalDialogOpen(expectPresence?: boolean): Promise<boolean>;
  dismissModalDialog(): Promise<void>;
  dismissModalDialogAttempt(): Promise<boolean>;
  cancelModalDialog(): Promise<void>;
  cancelModalDialogAttempt(): Promise<boolean>;
  acceptModalDialog(): Promise<void>;
  acceptModalDialogAttempt(): Promise<boolean>;

  isAnyPopUpOpen(expectPresence?: boolean): Promise<boolean>;
  popUpOpenList(): Promise<any[] | ElementArrayFinder>;
  dismissPopUp(webElement: ElementFinder): Promise<void>;
}
