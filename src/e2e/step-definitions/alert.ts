import { browser } from 'protractor';
const { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ When }) {

  When(/^I (accept)?( dismiss)? the alert dialog/, async (acceptDialog: boolean, negateDialog: boolean) => {
    if (!!negateDialog) {
      await browser.switchTo().alert().dismiss();
    } else {
      await browser.switchTo().alert().accept();
    }
  });

});
