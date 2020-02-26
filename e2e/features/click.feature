Feature: As an automation framework I can click elements

    @desktop
    @smoke
    Scenario: As a automation framework I can click a button
      Given I am on the "home" page
        And I click the "add button" button

    @desktop
    @smoke
    Scenario: As a automation framework I can click a specific button
      Given I am on the "home" page
        And I click the "add" for specific "button" button

    @desktop
    @smoke
    Scenario: As a automation framework I can click a button multiple times
      Given I am on the "home" page
        And I click the "increment button" button "5" times
      Then the "counter" contains the text "Current Count: 5"
        And I click the "decrement button" button "4" times
      Then the "counter" contains the text "Current Count: 1"

    @desktop
    @smoke
    Scenario: As a automation framework I can click a button at index multiple times
      Given I am on the "home" page
        And I click the "1st" "increment button" button "5" times
      Then the "counter" contains the text "Current Count: 5"
        And I click the "1st" "decrement button" button "4" times
      Then the "counter" contains the text "Current Count: 1"

    @desktop
    @smoke
    Scenario: As a automation framework I can click a specific button multiple times
      Given I am on the "home" page
        And I click the "increment" for specific "button" button "5" times
      Then the "counter" contains the text "Current Count: 5"
        And I click the "decrement" for specific "button" button "4" times
      Then the "counter" contains the text "Current Count: 1"

    @desktop
    @smoke
    Scenario: As a automation framework I can click the element with text
      Given I am on the "home" page
        And I click the "increment" for specific "button" button "5" times
      Then I click the "increment button" with the text "Increment"
        And I click the "decrement button" with the text "Decrement"

    @desktop
    @smoke
    Scenario: As a automation framework I can click element at index
      Given I am on the "home" page
        And I click the "2nd" "edit button" button

    @desktop
    @smoke
    Scenario: As a automation framework I can click element within element at index
      Given I am on the "home" page
        And I click the "edit button" button within the "1st" "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can click element within element
      Given I am on the "home" page
        And I click the "edit button" button within the "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can click element at index within element at index
      Given I am on the "home" page
        And I click the "1st" "edit button" button within the "1st" "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can click an element with on a dialog or form
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And I click the "submit" button in the "contact form" form

    @desktop
    @smoke
    Scenario: As a automation framework I can click an element that is displayed
      Given I am on the "home" page
        And I click the "search" button that is displayed

    @desktop
    @smoke
    Scenario: As a automation framework I can click an element at index that is displayed
      Given I am on the "home" page
        And I click the "1st" "search" button that is displayed
