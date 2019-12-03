import { browser } from 'protractor';
import { When } from 'cucumber';

When(/^I (accept)?(dismiss)? the alert dialog/, async (acceptDialog: boolean, negateDialog: boolean) => {
  if (!!negateDialog) {
    await browser.switchTo().alert().dismiss();
  } else {
    await browser.switchTo().alert().accept();
  }
});
