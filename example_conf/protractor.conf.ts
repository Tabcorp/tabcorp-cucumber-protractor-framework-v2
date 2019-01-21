// Because this file imports from  protractor, you'll need to have it as a
// project dependency. Please see the reference config: lib/config.ts for more
// information.
//
// Why you might want to create your config with typescript:
// Editors like Microsoft Visual Studio Code will have autocomplete and
// description hints.
//
// To run this example, first transpile it to javascript with `npm run tsc`,
// then run `protractor conf.js`.
import * as protractor from 'protractor';
import * as puppeteer from 'puppeteer';
import * as reporter from 'multiple-cucumber-html-reporter';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as moment from 'moment';
import * as e2econfig from './e2e.conf.json';
import { browser } from 'protractor';

const jsonReports = path.join(process.cwd(), 'e2e/reports/json');
const htmlReports = path.join(process.cwd(), 'e2e/reports/html');
const screenshots = path.join(process.cwd(), 'e2e/reports/screenshots');

const cucumberReporterOptions = {
  //ignore: [],
  jsonDir: jsonReports,
  reportPath: htmlReports,
  metadata: {
    browser: {
      name: 'chrome',
      version: '60'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Lott Protractor Tests' },
      { label: 'Base Url', value: e2econfig.baseUrl },
      { label: 'Execution Start Time', value: moment().format() }
    ]
  }
};

export let config: protractor.Config = {

  directConnect: true,
  framework: 'custom',
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--show-fps-counter',
        '--no-default-browser-check',
        '--no-first-run',
        '--disable-default-apps',
        '--disable-popup-blocking',
        '--disable-translate',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-device-discovery-notifications',
        '--disable-web-security',
        // '--headless',
        '--no-gpu'
      ],
      binary: puppeteer.executablePath()
    },
    // shardTestFiles: true,
    // maxInstances: 3
  },

  specs: [e2econfig.features],
  baseUrl: e2econfig.baseUrl,
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  allScriptsTimeout: e2econfig.testsConfigurationVariables.allScriptsTimeout,

  useAllAngular2AppRoots: e2econfig.testsConfigurationVariables.required.isAngular2App,

  cucumberOpts: {
    require: e2econfig.cucumberRequire,
    format: e2econfig.report,
    tags: e2econfig.tags
  },

  // suites: {
  //     smoke: 'dist/**/*.js',
  //     full: 'dist/**/*.js'
  // },

  // generate test report folder
  onPrepare: function () {
    if (!fs.existsSync(jsonReports)) {
      mkdirp.sync(jsonReports);
    }
    if (!fs.existsSync(htmlReports)) {
      mkdirp.sync(htmlReports);
    }
    if (!fs.existsSync(screenshots)) {
      mkdirp.sync(screenshots);
    }

    // pass custom & required config parameters
    browser.params.requiredConfig = (e2econfig.testsConfigurationVariables || {required:null}).required;
    browser.params.customConfig = (e2econfig.testsConfigurationVariables || {custom:null}).custom;
  },
  // invoke multiple-cucumber-html-reporter
  onComplete: function () {
    try {
      reporter.generate(cucumberReporterOptions);
    } catch (err) {
      if (err) {
        throw new Error('Failed to save cucumber test results to json file.');
      }
    }
  }

  // could set no globals to true to avoid jQuery '$' and protractor '$' collisions on the global namespace.
  //noGlobals: true
};
