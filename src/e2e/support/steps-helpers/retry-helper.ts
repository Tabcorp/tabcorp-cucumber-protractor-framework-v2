import { injectable, inject } from "inversify";
import { BASETYPES } from '../../IoC/base-types';
import { IRequiredConfig } from '../framework-helpers/interfaces/required-config';

@injectable()
export class RetryHelper {
  private readonly config: IRequiredConfig;

  constructor(@inject(BASETYPES.RequiredConfig) config: IRequiredConfig) {
    this.config = config;
  }

  public async waitFor(callback, {timeout = 40000, wait = 2000} = {}): Promise<boolean> {
    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const startDate = new Date();
    function run() {
      return callback().then(() => Promise.resolve(true), async (err) => {
        const runtime = new Date().getTime() - startDate.getTime();
        if (runtime >= timeout) {
          throw new Error('Not found!')
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
