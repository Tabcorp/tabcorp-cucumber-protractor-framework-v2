import { Given } from 'cucumber';
import { browser } from 'protractor';

Given(/^I execute the script "([^"]*)"$/, async (script: string) => {
  await browser.executeScript(script);
});