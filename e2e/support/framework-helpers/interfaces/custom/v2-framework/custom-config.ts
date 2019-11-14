import { LogginLevel } from "../../../../../../src/e2e/support/framework-helpers/interfaces/loggin-interfaces";

export interface ICustomConfig {
  loginPromptCheckUpDelay: number;
  logginLevel: LogginLevel;
  mockServerURL: string;
  jsonPayloadPath: string;
  fakeDataPath: string;
  urlsPath: string;
}
