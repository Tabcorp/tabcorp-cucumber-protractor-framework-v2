import { injectable, inject } from "inversify";
import { CUSTOMTYPES } from "../../../../IoC/custom/v2-framework/custom-types";
import { ICustomConfig } from "../../../framework-helpers/interfaces/custom/v2-framework/custom-config";

@injectable()
export class RetryHelper {
  private readonly customConfig: ICustomConfig;

  constructor(@inject(CUSTOMTYPES.CustomConfig) customConfig : ICustomConfig) {
    this.customConfig = customConfig;
  }

  public async waitFor(callback, {timeout = 20000, wait = 1000} = {}): Promise<boolean> {
    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const startDate = new Date();
    function run() {
      return callback().then(() => Promise.resolve(true), async (err) => {
        const runtime = new Date().getTime() - startDate.getTime();
        if (runtime >= timeout) {
          Promise.resolve(false);
        } else {
          console.log('Retrying...');
          await sleep(wait);
          return run();
        }
      });
    }
    return run();
  }
}
