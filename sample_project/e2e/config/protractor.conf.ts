// Because this file imports from protractor, you'll need to have it as a
// project dependency. Please see the reference config: lib/config.ts for more
// information.
//
// Why you might want to create your config with typescript:
// Editors like Microsoft Visual Studio Code will have autocomplete and
// description hints.
//
// To run this example, first transpile it to javascript with `npm run tsc`,
// then run `protractor conf.js`.
import protractor = require('protractor');
import puppeteer = require('puppeteer');
import reporter = require('multiple-cucumber-html-reporter');
import path = require('path');
import * as e2econfig from './e2e.conf.json';

const jsonReports = path.join(process.cwd(), 'e2e/reports/json');
const htmlReports = path.join(process.cwd(), 'e2e/reports/html');

const cucumberReporterOptions = {
  jsonDir: jsonReports,
  reportPath: htmlReports,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Play For Purpose Protractor Tests' },
      { label: 'Base Url', value: e2econfig.baseUrl },
      { label: 'Execution Start Time', value: (new Date()).toISOString() }
    ]
  }
};

exports.config = {

  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--no-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--enable-logging',
        '--v=2',
        '--crash-dumps-dir=/tmp',
        '--remote-debugging-address=0.0.0.0',
        '--remote-debugging-port=9876',
        '--window-size=1024,768'
      ],
    },
    loggingPrefs: {
      browser: 'INFO',
      driver: 'INFO'
    }
  },

  specs: [e2econfig.features],
  baseUrl: e2econfig.baseUrl,

  allScriptsTimeout: e2econfig.testsConfigurationVariables.allScriptsTimeout,

  useAllAngular2AppRoots: e2econfig.testsConfigurationVariables.required.isAngular2App,

  cucumberOpts: {
    require: e2econfig.cucumberRequire,
    format: e2econfig.report,
    tags: e2econfig.tags
  },

  // generate test report folder
  onPrepare: async () => {
    // pass custom & required config parameters
    protractor.browser.params.requiredConfig = (e2econfig.testsConfigurationVariables || {required: null}).required;
    protractor.browser.params.customConfig = (e2econfig.testsConfigurationVariables || {custom: null}).custom;

    await protractor.browser.waitForAngularEnabled(false);
  },

  // invoke multiple-cucumber-html-reporter
  onComplete: () => {
    try {
      reporter.generate(cucumberReporterOptions);
    } catch (err) {
      if (err) {
        throw new Error('Failed to save cucumber test results to json file.');
      }
    }
  }
};
