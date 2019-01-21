import { injectable } from "inversify";

@injectable()
export class StringGeneratorHelper {

  public getRandomEmailAddress(maxEmailNameLength: number): string {
    let emailAddress: string = "";
    let emailNameLength: number = Math.floor(Math.random() * maxEmailNameLength) + 1;
    let alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let emailProviders: string[] = ['gmail', 'mail', 'hotmail', 'yahoo'];

    while (emailNameLength > 0) {
      emailAddress += alphabet[Math.floor(Math.random() * 26)];
      emailNameLength--;
    }

    emailAddress += "@" + emailProviders[Math.floor(Math.random() * 4)] + ".com";
    return emailAddress;
  }
}
