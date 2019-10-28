import { injectable } from 'inversify';
import * as faker from 'faker';

@injectable()
export class DataHelper {
  public getRandomFirstName(): string {
    return faker.name.firstName();
  }

  public getRandomLastName(): string {
    return faker.name.lastName();
  }

  public getRandomEmailAddress(): string {
    return faker.internet.email();
  }

  public getPostcodeByState(state: string): string {
    let postcode: string = '';
    switch (state.toLocaleLowerCase()) {
      case 'act':
        postcode = '2900';
        break;
      case 'nsw':
        postcode = '2000';
        break;
      case 'nt':
        postcode = '0800';
        break;
      case 'sa':
        postcode = '5018';
        break;
      case 'tas':
        postcode = '7010';
        break;
      case 'nz':
        postcode = '5022';
        break;
      case 'vic':
        postcode = '3000';
        break;
      default:
        postcode = '4000';
        break;
    }
    return postcode;
  }
}
