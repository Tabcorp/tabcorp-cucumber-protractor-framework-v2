import { injectable } from "inversify";

import { ICustomConfig } from "../../../interfaces/custom/v2-framework/custom-config";
import { LogginLevel } from "../../../../../../src/e2e/support/framework-helpers/interfaces/loggin-interfaces";

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
