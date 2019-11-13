import { injectable, inject } from "inversify";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";

@injectable()
export class NumberHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  getDifferenceBetweenTwoNumbers(storedNumber: number, elementNumber: number) {
    return Math.abs(storedNumber - elementNumber);
  }

}
