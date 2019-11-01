import { browser } from 'protractor';
import { injectable, inject } from "inversify";

import { IComponentsWait } from 'IComponentsWait';
import { BASETYPES } from 'BASETYPES';
import { IRequiredConfig } from 'IRequiredConfig';

@injectable()
export class FormAngularComponentsWait implements IComponentsWait {

  private readonly requiredConfig: IRequiredConfig;

  constructor(@inject(BASETYPES.RequiredConfig) requiredConfig: IRequiredConfig) {
    this.requiredConfig = requiredConfig;
  }

  public async WaitForAllComponentsToLoad(reloadSamePage: boolean): Promise<void> {
    browser.waitForAngular();
  }

}



