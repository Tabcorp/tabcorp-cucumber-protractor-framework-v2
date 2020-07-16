# Using Protractor for Web team's end to end regression tests

## Pre-condition

Ensure your local PC has `node v8.15.0` & `npm 6.6.0` installed

Verify node version: `node -v`

Verify npm version: `npm -v`

## How to use tabcorp cucumber protractor framework v2 in your project

1.) Run in your project via terminal `npm i tabcorp-cucumber-protractor-framework-v2`

2.) Replicate the e2e.conf.json and protractor.conf.ts inside your own e2e/config folder
    > Found in `example_conf` folder.
    
3.) Create a cucumber feature with a scenario that leverages a step from the common framework

4.) Add the below to your scripts within package.json

` "e2e": "shx rm -rf dist && tsc && ./node_modules/protractor/bin/webdriver-manager update && ./node_modules/protractor/bin/protractor ./dist/e2e/config/protractor.conf.js" `

5.) Run the scenario using `npm run e2e`

6.) Install any required packages locally eg.

    npm install cucumber@latest --save-dev
    npm install protractor@latest --save-dev
    npm install protractor-cucumber-framework@latest --save-dev

## How to run the tabcorp cucumber protractor framework v2 working locally

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

1.) Increase `version` under `package.json`

2.) Get your dev branch code reviewd and merged to master

3.) Get latest master locally and publish npm - ensure you have a npm account first

    npm login
    npm publish

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

##### verify-element-presence

- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" element
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" element
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" for specific "([^"]*)" element
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" for specific "([^"]*)" element
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([0-9]+)" "([^"]*)" (?:element|elements)
- Then the "([^"]*)" containing the text "([^"]*)" has a "([^"]*)" element
- Then the "([^"]*)" (?:button|link|icon|element) should( not)? be present
- Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be present
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be present
- Then the "([^"]*)" element within the "([^"]*)" should( not)? be present

##### verify-element-status

- Then the "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled
- Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled
- Then the "([^"]*)" (?:checkbox|radio button) should( not)? be selected
- Then the "([^"]*)" (?:checkbox|radio button) within the "([^"]*)" should( not)? be selected
- Then the "([^"]*)" for specific "([^"]*)" (?:checkbox|radio button) should( not)? be selected
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:checkbox|radio button) should( not)? be selected

##### verify-jurisdiction

- Then I should be in the jurisdiction "([^"]*)"

##### verify-moment

- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the time "([^"]*)"
- Then the "([^"]*)" contains the current month and year
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the current year
- Then the selected option in "([^"]*)" contains the current month
- Then the selected option in "([^"]*)" contains the current year

##### verify-page

- Then I should be on the "([^"]*)" page
- Then I see the "([^"]*)" page title 
- Then the current url contains "([^"]*)"
- Then a new tab is open with the url containing "([^"]*)"
- Then a new tab will be opened with the url containing "([^"]*)"

##### verify-table

- Then the "([^"]*)" table contains the following
- Then the "([^"]*)" table does not contain the following
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" table contains the following
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" table does not contain the following

##### verify-user-status

- Then I am logged out

##### verify-value

- Then the "([^"]*)" contains no text$
- Then the "([^"]*)" (does not )?contains? the "([^"]*)"
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)"
- Then the "([^"]*)" for specific "([^"]*)" (does not )?contains? the text "([^"]*)"
- Then the "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- Then the "([^"]*)" (does not )?contains? the "([^"]*)" attribute
- Then the "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- Then the "([^"]*)" should equal the value "([^"]*)"
- Then the "([^"]*)" (does not )?contains? the value "([^"]*)"
- Then the "([^"]*)" element within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"
- Then the last "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"
- Then the "([^"]*)" (?:element|option|dropdown) contains a total of "([^"]*)" options
- Then the "([^"]*)" eventually contains the text "([^"]*)" 
- Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" eventually contains the text "([^"]*)" 

##### verify-visibility

- Then I can see "([^"]*)" "([^"]*)" (?:buttons|links|icons|element|elements)
- Then I can see "(\d*)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)
- Then I can see (more than|at least) "(\d+)" "([^"]*)" (?:buttons|links|icons|elements)
- Then I can see (more than|at least) "(\d+)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)
- Then I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- Then I see the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- Then I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|element|elements) displayed
- Then I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" displayed
- Then the "([^"]*)" element should( not)? be displayed
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed
- Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be displayed
- Then the "([^"]*)" element is eventually present 
- Then the "([^"]*)" element is eventually displayed 
- Then the "([^"]*)" element is eventually not displayed
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element is eventually displayed 
- Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element is eventually not displayed

##### alerts

- When I (accept)?( dismiss)? the alert dialog

##### browser-interaction

-  When I mouse over (the )?"([^"]*)"
-  When I hover over (the )?"([^"]*)"
-  When I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"
-  When I move the mouse "([^"]*)" to the right and "([^"]*)" down from the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element
-  When I switch to the "(new open|1st|2nd|3rd|[0-9]+th)" tab
-  When I wait "([^"]*)" seconds

##### click

- When I click the "([^"]*)" (?:button|link|icon|element|radio button)
- When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
- When I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button)
- When I click the "([^"]*)" (?:button|link|icon|element|radio button) "([0-9])" times
- When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) "([^"]*)" times
- When I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) "([0-9]+)" times
- When I click the "([^"]*)" with the text "([^"]*)"
- When I click the "([^"]*)" (?:button|link|icon|element) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- When I click the "([^"]*)" (?:button|link|icon|element) within the "([^"]*)"
- When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|checkbox) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- When I click the "([^"]*)" (?:button|link|icon|element) in the "([^"]*)" (?:dialog|element|form)
- When I click the "([^"]*)" (?:button|link|icon|element|radio button) that is displayed
- When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) that is displayed
- When I click the "([^"]*)" (?:button|link|icon|element|radio button) using javascript
- When the "([^"]*)" is eventually clickable (angular only)
- When I eventually click the "([^"]*)" (?:button|link|icon|element|radio button|check box) (angular only)
- When I eventually click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|radio button|check box) (angular only)

##### input-dropdown

-  When I fill in the "([^"]*)" input with "([^"]*)"
-  When I fill in the "([^"]*)" input with a random valid email address
-  When I fill in the "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
-  When I fill in the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
-  When I clear the field "([^"]*)"
-  When I select the option starting with "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)
-  When I select the option "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)
-  When I select the "([^"]*)" as "([^"]*)"
-  When the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input) contains the text "([^"]*)"
-  When the last "([^"]*)" (?:option|element|input) contains the text "([^"]*)"
-  When the "([^"]*)" (?:element|dropdown) contains a total of "([^"]*)" options
-  When I fill in the "([^"]*)" input with "([^"]*)" in the "([^"]*)" form
-  When the "([^"]*)" input field is empty

##### jurisdiction

- When I select the jurisdiction "([^"]*)"

##### login

- When I am not logged in
- When I am logged in with username "([^"]*)" and password "([^"]*)"
- When I log in with username "([^"]*)" and password "([^"]*)"
- When I sign out
- When I fill the username "([^"]*)" and password "([^"]*)" in the login prompt

##### navigation

- When I navigate to the "([^"]*)" page
- When I refresh the page
- When I navigate to the URL "([^"]*)"

#### script

- When I execute the script "([^"]*)"

#### system setup

- When I setup the site for "([^"]*)"


