# Using Protractor for Web team's end to end regression tests

## Pre-condition

Ensure your local PC has `node v8.15.0` & `npm 6.6.0` installed

Verify node version: `node -v`

Verify npm version: `npm -v`

## How to make the tabcorp cucumber protractor framework v2 working locally

1. Clone this repository to your local machine

2. Within your new repository, from the command line (in the tabcorp-cucumber-protractor-framework-v2 folder) run:

    ```
    npm install
    npm run build
    ```

## Scripts
```
# install packages
npm install

# build the project
npm run build

# Starting compilation in watch mode
npm watch

# execute unit testing 
npm run test

# Remove dist directory
npm run clean
```

### Update tabcorp cucumber protractor framework npm package

1. Increase `version` under `package.json`

2. Get your dev branch code reviewd and merged to master

3. Get latest master locally and publish npm - ensure you have a npm account first

    npm login
    npm publish

### Get your project up and running:

1. Install the tabcorp cucumber protractor framework v2 into your project

    npm install tabcorp-cucumber-protractor-framework-v2@latest --save-dev

2. Ensure your project has the following (required for the protractor.conf.js)

    npm install cucumber@latest --save-dev
    npm install protractor@latest --save-dev
    npm install protractor-cucumber-framework@latest --save-dev

3. Copy and paste the protractor.conf.ts and e2e.conf.json (example in example_conf) into your project and update accordingly.

4. Run your cucumber-protractor tests as usual from your project repository (note example for a typescript project)

    ./node_modules/protractor/bin/protractor ./dist/config/protractor.conf.js

## Example Folder Structure

### Your Project:    

/e2e
 * /config (contains your protractor.conf.ts and e2e.conf.json)
 * /features (.feature files)
 * /feature-rules
 * /IoC
   * custom
 * /mappings 
   * custom 
 * /reports
 * /step-definitions
   * custom 
 * /support
   * /custom hooks
   * /framework-helpers
      * /implementations
      * custom
     * /interfaces
      * interfaces
   * /logger
      * custom
   * /step-helpers
      * custom
 * /unit 
    * custom


# Cucumber steps available

Coming Soon
