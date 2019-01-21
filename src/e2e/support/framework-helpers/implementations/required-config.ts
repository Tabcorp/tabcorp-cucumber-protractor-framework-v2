import { injectable } from "inversify";
import "reflect-metadata";
import { IRequiredConfig, IRetryConfig, IRelativePaths, IRetry } from "../interfaces/required-config";

@injectable()
export class RequiredConfig implements IRequiredConfig {
  public retry: IRetryConfig = null;
  public relativePaths: IRelativePaths = null;
  public disableTransitions: boolean = null;
  public afterClickWaitDelay: number = null;
  public animationClasses: string[];
  public isAngularApp: boolean = false;
  public isAngular2App: boolean = false;
  public defaultStartPage: string;

  constructor(public config?: IRequiredConfig) {
    if (config != null) {
      this.retry = config.retry;
      this.relativePaths = config.relativePaths;
      this.disableTransitions = !!config.disableTransitions && config.disableTransitions;
      this.afterClickWaitDelay = config.afterClickWaitDelay;
      this.animationClasses = config.animationClasses;
      this.isAngularApp = !!config.isAngularApp && config.isAngularApp;
      this.isAngular2App = !!config.isAngular2App && config.isAngular2App;
      this.defaultStartPage = config.defaultStartPage;
    }

    if (this.retry == null) {
      this.retry = {
        default: {
          attempt: 2,
          delay: 150
        },
        expectedNotFound: {
          attempt: 1,
          delay: 100
        }
      }
    } else {
      this.retry.default = (this.retry.default || {} as IRetry);
      this.retry.default.attempt = this.retry.default.attempt != null ? this.retry.default.attempt : 2;
      this.retry.default.delay = this.retry.default.delay != null ? this.retry.default.delay : 150;
      this.retry.expectedNotFound = (this.retry.expectedNotFound || {} as IRetry);
      this.retry.expectedNotFound.attempt = this.retry.expectedNotFound.attempt != null ? this.retry.expectedNotFound.attempt : 1;
      this.retry.expectedNotFound.delay = this.retry.expectedNotFound.delay != null ? this.retry.expectedNotFound.delay : 100;
    }

    if (this.relativePaths == null) {
      this.relativePaths = {
        elements: 'path_not_provided',
        urls: 'path_not_provided',
        scripts: 'path_not_provided'
      }
    } else {
      this.relativePaths.elements = (this.relativePaths.elements || 'path_not_provided');
      this.relativePaths.urls = (this.relativePaths.urls || 'path_not_provided');
      this.relativePaths.scripts = (this.relativePaths.scripts || 'path_not_provided');
    }

    if (this.afterClickWaitDelay == null) {
      this.afterClickWaitDelay = 10;
    }

    if (this.animationClasses == null) {
      this.animationClasses = [];
    }

    if (this.defaultStartPage == null) {
      this.defaultStartPage = "Home";
    }
  }
}

