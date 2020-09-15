import inversify = require('inversify');
import protractor = require('protractor');
import framework = require('tabcorp-cucumber-protractor-framework-v2');

@inversify.injectable()
export class PlayForPurposeAngularComponentsWait implements framework.IComponentsWait {

  private readonly requiredConfig: framework.IRequiredConfig;

  constructor(@inversify.inject(framework.BASETYPES.RequiredConfig) requiredConfig: framework.IRequiredConfig) {
    this.requiredConfig = requiredConfig;
  }

  public async WaitForAllComponentsToLoad(reloadSamePage: boolean): Promise<void> {
    protractor.browser.waitForAngular();
  }
}
