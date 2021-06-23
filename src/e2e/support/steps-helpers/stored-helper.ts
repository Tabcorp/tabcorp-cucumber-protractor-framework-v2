import { injectable, inject } from "inversify";

import { IRequiredConfig } from '../framework-helpers/interfaces/required-config';
import { BASETYPES } from '../../IoC/base-types';

var stored_element_data;

@injectable()
export class StoredHelper {
  private readonly config: IRequiredConfig;

  constructor(@inject(BASETYPES.RequiredConfig) config: IRequiredConfig) {
    this.config = config;
  }

  storeElementData(element_text: string) {
    stored_element_data = element_text;
  }

  getStoredElementData() {
    return stored_element_data;
  }

}
