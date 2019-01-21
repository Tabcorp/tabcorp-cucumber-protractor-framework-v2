export enum LogginLevel {
  Info = 'info',
  InfoSuccess = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface ILog {
  logLevel: LogginLevel;
  logData: string;
}
