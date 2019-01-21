export interface IRequiredConfig {
  retry: IRetryConfig;
  relativePaths: IRelativePaths;
  disableTransitions: boolean;
  afterClickWaitDelay: number;
  animationClasses: string[];
  isAngularApp: boolean;
  isAngular2App: boolean;
  defaultStartPage: string;
}

export interface IRetryConfig {
  default: IRetry,
  expectedNotFound: IRetry
}
export interface IRetry {
  attempt: number;
  delay: number;
}

export interface IRelativePaths {
  urls: string;
  elements: string;
  scripts: string;
}
