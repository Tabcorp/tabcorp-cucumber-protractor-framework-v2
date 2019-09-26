export class DataHelper {
  public getRandomString(length: number): string {
    let result: string = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
