import { injectable, inject } from "inversify";
import { BASETYPES } from '../../IoC/base-types';
import { IRequiredConfig } from '../framework-helpers/interfaces/required-config';

@injectable()
export class RetryHelper {
  private readonly config: IRequiredConfig;

  constructor(@inject(BASETYPES.RequiredConfig) config: IRequiredConfig) {
    this.config = config;
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
