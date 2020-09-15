import inversify = require('inversify');
import framework = require('tabcorp-cucumber-protractor-framework-v2');

@inversify.injectable()
export class PlayForPurposeLogger implements framework.ILogger {
  private logLevel: framework.LogginLevel;

  public async getIdentifierFromWebElement(webElement): Promise<string> {
    const id: string = `selector="${webElement.locator().value}"`;
    return id;
  }

  public log(log: framework.ILog): void {
    this.writeLog(log);
  }

  public logError(error: string): void {
    this.writeLog({logData: error, logLevel: framework.LogginLevel.Error});
  }

  private shouldLog(log: framework.ILog): boolean {
    if (this.logLevel === framework.LogginLevel.Info) {
      return true;
    }

    if (this.logLevel === framework.LogginLevel.InfoSuccess
      && log.logLevel === framework.LogginLevel.Info) {
      return false;
    }

    if (this.logLevel === framework.LogginLevel.Warning
      && (log.logLevel === framework.LogginLevel.Info
        || log.logLevel === framework.LogginLevel.InfoSuccess)) {
      return false;
    }

    if (this.logLevel === framework.LogginLevel.Error
      && log.logLevel !== framework.LogginLevel.Error) {
      return false;
    }

    return true;
  }

  generateLogMessage(log: framework.ILog): string {
    let formattedLogMessage = null;

    if (this.shouldLog(log)) {

      const color: string = log.logLevel === framework.LogginLevel.Error
        ? '\x1b[31m' // red
        : log.logLevel === framework.LogginLevel.Warning
          ? '\x1b[33m'  // yellow
          : log.logLevel === framework.LogginLevel.InfoSuccess
            ? '\x1b[32m' // green
            : '\x1b[37m';  // white

      formattedLogMessage = `${color}${log.logData}\x1b[0m`;
    }

    return formattedLogMessage;
  }

  generateErrorMessage(error: string): string {
    return `\x1b[31m${error}\x1b[0m`;
  }

  private writeLog(log: framework.ILog): void {
    const logMsg: string = this.generateLogMessage(log);

    if (logMsg != null) {
      console.log(logMsg);
    }
  }
}
