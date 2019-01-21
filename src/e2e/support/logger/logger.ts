import { ElementFinder } from "protractor";
import { ILog } from "../framework-helpers/interfaces/loggin-interfaces";

export interface ILogger {
  getIdentifierFromWebElement (webElement: ElementFinder): Promise<string>;
  log(log: ILog): void;
  logError(error: string): void;
  generateLogMessage(log: ILog): string;
  generateErrorMessage(error: string): string;
}
