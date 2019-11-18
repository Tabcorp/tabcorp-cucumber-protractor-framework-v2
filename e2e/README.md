# Automation Test our Automation Framework!

## Steps Covered (custom)

- [ ] Given I am on the "([^"]*)" page

## Steps Covered (v2 Framework)

##### verify-element-presence

- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" element
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" does not contain the "([^"]*)" element
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" does not contain the "([^"]*)" for specific "([^"]*)" element
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" for specific "([^"]*)" does not contain the "([^"]*)" for specific "([^"]*) element
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the "([^"]*)" element
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([0-9]+)" "([^"]*)" (?:element|elements)
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains "([^"]*)" "([^"]*)"
- [ ] Then the "([^"]*)" containing the text "([^"]*)" has a "([^"]*)" element
- [ ] Then the "([^"]*)" (?:button|link|icon|element) should( not)? be present
- [ ] Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be present
- [ ] Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be present
- [ ] Then the "([^"]*)" element within the "([^"]*)" should( not)? be present

##### verify-element-status

- [ ] Then the "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled
- [ ] Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) should( not)? be enabled
- [ ] Then the "([^"]*)" (?:checkbox|radio button) should( not)? be selected
- [ ] Then the "([^"]*)" (?:checkbox|radio button) within the "([^"]*)" should( not)? be selected
- [ ] Then the "([^"]*)" for specific "([^"]*)" (?:checkbox|radio button) should( not)? be selected
- [ ] Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:checkbox|radio button) should( not)? be selected

##### verify-jurisdiction

- [ ] Then I should be in the jurisdiction "([^"]*)"

##### verify-moment

- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the time "([^"]*)"
- [ ] Then the "([^"]*)" contains the current month and year
- [ ] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" contains the current year
- [ ] Then the selected option in "([^"]*)" contains the current month
- [ ] Then the selected option in "([^"]*)" contains the current year

##### verify-page

- [ ] Then I should be on the "([^"]*)" page
- [ ] Then I see the "([^"]*)" page title 
- [ ] Then the current url contains "([^"]*)"
- [ ] Then a new tab is open with the url containing "([^"]*)"
- [ ] Then a new tab will be opened with the url containing "([^"]*)"

##### verify-table

- [ ] Then the "([^"]*)" table contains the following
- [ ] Then the "([^"]*)" table does not contain the following
- [ ] Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" table contains the following
- [ ] Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" table does not contain the following

##### verify-user-status

- [ ] Then I am logged out

##### verify-value

- [x] Then the "([^"]*)" contains no text
- [x] Then the "([^"]*)" (does not )?contains? the "([^"]*)"
- [x] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)"
- [x] Then the "([^"]*)" for specific "([^"]*)" (does not )?contains? the text "([^"]*)"
- [x] Then the "([^"]*)" for specific "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- [x] Then the "([^"]*)" (does not )?contains? the "([^"]*)" attribute
- [x] Then the "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- [x] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- [x] Then the "([^"]*)" input should equal the value "([^"]*)"
- [x] Then the "([^"]*)" contains the value "([^"]*)"
- [x] Then the "([^"]*)" element within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element (does not )?contains? the "([^"]*)" attribute "([^"]*)"
- [x] Then the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"
- [x] Then the last "([^"]*)" (?:option|element|input|dropdown) contains the text "([^"]*)"
- [x] Then the "([^"]*)" (?:element|option|dropdown) contains a total of "([^"]*)" options

##### verify-visibility

- [ ] Then I can see "([^"]*)" "([^"]*)" (?:buttons|links|icons|element|elements)
- [ ] Then I can see "(\d*)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)
- [ ] Then I can see at least "(\d+)" "([^"]*)" (?:buttons|links|icons|elements)
- [ ] Then I can see at least "(\d+)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)
- [ ] Then I can see more than "(\d*)" "([^"]*)" (?:buttons|links|icons|elements)
- [ ] Then I can see more than "(\d*)" "([^"]*)" for specific "([^"]*)" (?:buttons|links|icons|elements)
- [ ] Then I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- [ ] Then I see the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- [ ] Then I can see "(\d*)" "([^"]*)" (?:buttons|links|icons|element|elements) displayed
- [ ] Then I can see "(\d*)" "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" displayed
- [ ] Then the "([^"]*)" element should( not)? be displayed
- [ ] Then the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" element should( not)? be displayed
- [ ] Then the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element) should( not)? be displayed

##### alerts

- [ ] When I (accept)?( dismiss)? the alert dialog

##### browser-interaction

- [ ] When I mouse over (the )?"([^"]*)"
- [ ] When I hover over (the )?"([^"]*)"
- [ ] When I hover over the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)"
- [ ] When I move the mouse "([^"]*)" to the right and "([^"]*)" down from the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" element
- [ ] When (I have )?clicked
- [ ] When I scroll down (\d+)
- [ ] When I scroll to the bottom of the page
- [ ] When I scroll to the top of the page
- [ ] When I scroll down (\d+) within the "([^"]*)"
- [ ] When I scroll to the "([^"]*)" element
- [ ] When I switch to the "(new open|1st|2nd|3rd|[0-9]+th)" tab
- [ ] When I wait "([^"]*)" seconds

##### click

- [ ] When I click the "([^"]*)" (?:button|link|icon|element|radio button)
- [ ] When I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button)
- [ ] When I click the "([^"]*)" (?:button|link|icon|element|radio button) "([0-9])" times
- [ ] When I click the "([^"]*)" for specific "([^"]*)" (?:button|link|icon|element|radio button) "([0-9]+)" times
- [ ] When I click the "([^"]*)" with the text "([^"]*)"
- [ ] When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
- [ ] When I click the "([^"]*)" (?:button|link|icon|element) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- [ ] When I click the "([^"]*)" (?:button|link|icon|element) within the "([^"]*)"
- [ ] When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element|checkbox) within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)"
- [ ] When I click the "([^"]*)" (?:button|link|icon|element) in the "([^"]*)" (?:dialog|element|form)
- [ ] When I click the "([^"]*)" (?:button|link|icon|element|radio button) that is displayed
- [ ] When I click the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element) "([^"]*)" times
- [ ] When I click the "([^"]*)" (?:button|link|icon|element) "([^"]*)" times

##### input-dropdown

- [ ] When I fill in the "([^"]*)" input with "([^"]*)"
- [ ] When I fill in the "([^"]*)" input with a random valid email address
- [ ] When I fill in the "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
- [ ] When I fill in the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" input with "([^"]*)" within the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:button|link|icon|element)
- [ ] When I clear the field "([^"]*)"
- [ ] When I select the option starting with "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)
- [ ] When I select the option "([^"]*)" from the "([^"]*)" (?:element|field|dropdown)
- [ ] When I select the "([^"]*)" as "([^"]*)"
- [ ] When the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" (?:option|element|input) contains the text "([^"]*)"
- [ ] When the last "([^"]*)" (?:option|element|input) contains the text "([^"]*)"
- [ ] When the "([^"]*)" (?:element|dropdown) contains a total of "([^"]*)" options
- [ ] When I fill in the "([^"]*)" input with "([^"]*)" in the "([^"]*)" form
- [ ] When the "([^"]*)" input field is empty

##### jurisdiction

- [ ] When I select the jurisdiction "([^"]*)"

##### login

- [ ] When I am not logged in
- [ ] When I am logged in with username "([^"]*)" and password "([^"]*)"
- [ ] When I log in with username "([^"]*)" and password "([^"]*)"
- [ ] When I sign out
- [ ] When I fill the username "([^"]*)" and password "([^"]*)" in the login prompt

##### navigation

- [ ] When I navigate to the "([^"]*)" page
- [ ] When I refresh the page
- [ ] When I navigate to the URL "([^"]*)"

#### script

- [ ] When I execute the script "([^"]*)"

#### system setup

- [ ] When I setup the site for "([^"]*)"

