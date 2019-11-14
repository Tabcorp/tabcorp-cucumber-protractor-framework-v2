import { ElementFinder, logging } from "protractor";
import { injectable, inject } from "inversify";

import { ILogger } from "../../../../../src/e2e/support/logger/logger";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";
import { LogginLevel, ILog } from "../../../../../src/e2e/support/framework-helpers/interfaces/loggin-interfaces";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";

@injectable()
export class FormLogger implements ILogger {
  private logLevel: LogginLevel;


  public async getIdentifierFromWebElement(webElement: ElementFinder): Promise<string> {
    let id: string = `selector="${webElement.locator().value}"`;
    return id;
  }

  public log(log: ILog): void {
    this.writeLog(log);
  }

  public logError(error: string): void {
    this.writeLog({logData: error, logLevel: LogginLevel.Error});
  }

  private shouldLog(log: ILog): boolean {
    if (this.logLevel === LogginLevel.Info) {
      return true;
    }

    if (this.logLevel === LogginLevel.InfoSuccess
      && log.logLevel === LogginLevel.Info) {
      return false;
    }

    if (this.logLevel === LogginLevel.Warning
      && (log.logLevel === LogginLevel.Info
      || log.logLevel === LogginLevel.InfoSuccess)) {
      return false
    }

    if (this.logLevel === LogginLevel.Error
      && log.logLevel !== LogginLevel.Error) {
      return false;
    }

    return true;
  }

  generateLogMessage(log: ILog): string {
    let formattedLogMessage = null;

    if (this.shouldLog(log)) {

      const color: string = log.logLevel === LogginLevel.Error
        ? '\x1b[31m' // red
        : log.logLevel === LogginLevel.Warning
          ? '\x1b[33m'  // yellow
          : log.logLevel === LogginLevel.InfoSuccess
            ? '\x1b[32m' // green
            : '\x1b[37m';  // white

      formattedLogMessage = `${color}${log.logData}\x1b[0m`;
    }

    return formattedLogMessage;
  }

  generateErrorMessage(error: string): string {
    return `\x1b[31m${error}\x1b[0m`;
  }

  private writeLog(log: ILog): void {
    let logMsg: string = this.generateLogMessage(log);

    if (logMsg != null) {
      console.log(logMsg);
    }
  }

}
