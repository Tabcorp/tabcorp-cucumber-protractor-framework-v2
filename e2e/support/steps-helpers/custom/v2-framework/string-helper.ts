import { injectable, inject } from "inversify";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/custom-config";

@injectable()
export class StringHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  convertStringToNumber(text: string) {
    var current_text = text.replace(/\$/g,"");
    return Number(current_text.replace(/[^0-9\.]+/g,""));
  }

}
