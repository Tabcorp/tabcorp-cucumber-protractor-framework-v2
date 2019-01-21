# Using Protractor for Web team's end to end regression tests

## Pre-condition

Ensure your local PC has `node v8.10.0` & `npm 5.6.0` installed

Verify node version: `node -v`

Verify npm version: `npm -v`

## How to make it working locally

1. Clone this repository to your local machine

2. Within your new repository, from the command line (in the lott-web-protractor folder) run:

    ```
    npm install
    npm run build-e2e
    ```

3. Then you will see the test result in

     %YourLocal%/lott-web-protractor/reports/html/index.html

## Scripts
```
# install packages
npm install

# build the project and execute e2e testing
npm run e2e

# rebuild the project
npm run build

# execute unit testing
npm test

# execute unit testing and generate teamcity report
npm run teamcity-test
```

See the confluence page for more details: https://confluence.tattsgroup.io/x/L4NKF
