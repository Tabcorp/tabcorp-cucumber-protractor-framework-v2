import { injectable, inject } from "inversify";

import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";

var stored_element_data;

@injectable()
export class StoredElementDataHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  storeElementData(element_text: string) {
    stored_element_data = element_text;
  }

  getStoredElementData() {
    return stored_element_data;
  }

}
