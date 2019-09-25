import moment = require("moment-timezone");
import { injectable } from 'inversify';

@injectable()
export class MomentHelper {

  public convertBneToLocal(date: string): string {
    const incomingDateFmt: string = 'h:mma MMM D, YYYY';
    return moment.tz(date, incomingDateFmt, "Australia/Brisbane").local().format(incomingDateFmt);
  }

  public getCurrentMonthAndYear(): string {
    return moment().format("MMMM YYYY");
  }

  public getCurrentYear(): string {
    return moment().format("YYYY");
  }

  public getCurrentMonth(): string {
    return moment().format("MMMM");
  }

  public formatMonth(month: string): string {
    return moment(month, 'MM').format('MMMM');
  }
}
