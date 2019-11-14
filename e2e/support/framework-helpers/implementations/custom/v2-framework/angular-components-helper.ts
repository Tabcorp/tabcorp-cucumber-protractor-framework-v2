import { browser } from 'protractor';
import { injectable, inject } from "inversify";

import { IComponentsWait } from '../../../../../../src/e2e/support/framework-helpers/interfaces/component-wait';
import { BASETYPES } from '../../../../../../src/e2e/IoC/base-types';
import { IRequiredConfig } from '../../../../../../src/e2e/support/framework-helpers/interfaces/required-config';

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



