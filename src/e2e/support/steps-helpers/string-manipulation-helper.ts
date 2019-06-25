import { injectable } from "inversify";

@injectable()
export class StringManipulationHelper {

    public replaceLineBreaks(string: string): string {
        return string.replace(/(\r\n|\n|\r)/gm," ");
    }
}
