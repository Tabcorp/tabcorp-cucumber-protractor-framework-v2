import { injectable } from "inversify";

import { ICustomConfig } from "../../../interfaces/custom/custom-config";
import { LogginLevel } from "LogginLevel";

@injectable()
export class FormCustomConfig implements ICustomConfig {
  jurisdictions: string;
  logginLevel: LogginLevel;
  loginPromptCheckUpDelay: number;
  mockServerURL: string;
  fakeDataPath: string;
  jsonPayloadPath: string;
  urlsPath: string;
}
