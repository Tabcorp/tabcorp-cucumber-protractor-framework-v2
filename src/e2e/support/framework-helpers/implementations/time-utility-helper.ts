import { injectable, inject } from "inversify";
import { BASETYPES } from "../../../IoC/base-types";
import { IRequiredConfig } from "../interfaces/required-config";
import { ILogger } from "../../logger/logger";
import { LogginLevel } from "../interfaces/loggin-interfaces";

@injectable()
export class TimeUtility {

  private readonly requiredConfig: IRequiredConfig;
  private readonly logger: ILogger;

  constructor(@inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig,
              @inject(BASETYPES.Logger) logger: ILogger) {
    this.requiredConfig = requiredConfig;
    this.logger = logger;
  }

  public doTaskAfterDelay<T>(action: any, delayMs: number): Promise<T> {
    const voidMethod = (resolve: any): void => {
      setTimeout(() => {
        const result: T = action();
        resolve(result);
      }, delayMs);
    }
    const promise: Promise<T> = new Promise(voidMethod);

    return promise;
  }

  public async doAsyncTaskAfterDelay<T>(action: any, delayMs: number): Promise<T> {
    const voidMethod = (resolve: any): void => {
      setTimeout(async () => {
        const result: T = await action();
        resolve(result);
      }, delayMs);
    }
    const promise: Promise<T> = new Promise(voidMethod);

    return promise;
  }

  public doActionAfterDelay(action: any, delayMs: number): Promise<void> {
    const voidMethod = (resolve: any): void => {
      setTimeout(() => {
        action();
        resolve(null);
      }, delayMs);
    }
    const promise: Promise<void> = new Promise(voidMethod);

    return promise;
  }

  public async doAsyncActionAfterDelay(action: any, delayMs: number): Promise<void> {
    const voidMethod = (resolve: any): void => {
      setTimeout(async () => {
        await action();
        resolve(null);
      }, delayMs);
    }
    const promise: Promise<void> = new Promise(voidMethod);

    return promise;
  }

  public doActionWithRetry<T>(callBack: (arg: any) => T, arg?: any, fallBackReturnCallback?: () => T, attempts?: number, delayMs?: number, throwOnNotFound: boolean = false)
    : T {
    if (attempts == null) {
      attempts = this.requiredConfig.retry.default.attempt + 1;
    }
    if (delayMs == null) {
      delayMs = this.requiredConfig.retry.default.delay;
    }

    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        const obj: T = callBack(arg);
        return obj;
      } catch (e) {
        const notLastAttempt: boolean = !this.wasLastAttempt(attempt, attempts);
        this.logger.log({logData:`attempt ${attempt}: ${e}` + (notLastAttempt? ' retrying' : ''), logLevel: LogginLevel.Info});
        if (notLastAttempt) {
          this.waitForMs(delayMs);
        }
      }
    }

    if (throwOnNotFound) {
      throw `action unsuccessful after ${attempts} (waited ${attempts * delayMs}ms)`;
    }

    return fallBackReturnCallback != null ? fallBackReturnCallback() : null;
  }

  public async doAsyncActionWithRetry<T>(callBack: (arg: any) => Promise<T>, arg?: any, fallBackReturnCallback?: () => T, attempts?: number, delayMs?: number, throwOnNotFound: boolean = false): Promise<T> {
    if (attempts == null) {
      attempts = this.requiredConfig.retry.default.attempt + 1;
    }
    if (delayMs == null) {
      delayMs = this.requiredConfig.retry.default.delay;
    }

    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        const obj: T = await callBack(arg);
        return obj;
      } catch (e) {
        const notLastAttempt: boolean = !this.wasLastAttempt(attempt, attempts);
        this.logger.log({logData:`attempt ${attempt}: ${e}` + (notLastAttempt? ' retrying' : ''), logLevel: LogginLevel.Info});
        if (notLastAttempt) {
          await this.waitForMs(delayMs);
        }
      }
    }

    if (throwOnNotFound) {
      throw `action unsuccessful after ${attempts} (waited ${attempts * delayMs}ms)`;
    }

    return fallBackReturnCallback != null ? fallBackReturnCallback() : null;
  }

  private wasLastAttempt(attempt: number, attempts: number): boolean {
    return attempt + 1 == attempts;
  }

  private async waitForMs(delayMs: number): Promise<void> {

    const voidMethod = (resolve: any): void => {
      setTimeout(() => {resolve(null)}, delayMs);
    }
    const promise: Promise<void> = new Promise(voidMethod);

    return promise;
  }
}
