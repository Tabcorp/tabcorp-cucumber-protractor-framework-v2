Feature: As an automation framework I can interact with the browser

    @desktop
    @smoke
    Scenario: As a automation framework I can mouse over an element
      Given I am on the "home" page
          And I mouse over the "add button"

    @desktop
    @smoke
    Scenario: As a automation framework I can hover over an element
      Given I am on the "home" page
          And I hover over the "add button"

    @desktop
    @smoke
    Scenario: As a automation framework I can hover over an element at index
      Given I am on the "home" page
          And I hover over the "1st" "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can move the mouse cursor in a specific way from an element at index
      Given I am on the "home" page
          And I move the mouse "100" to the right and "100" down from the "1st" "contact item" element

    @desktop
    @smoke
    Scenario: As a automation framework I can wait on the page for a specific amount of seconds
      Given I am on the "home" page
          And I wait "3" seconds
      Then the "contacts header" contains the text "Contacts"
        And the "contacts header" does not contain the text "French Revolution"

    @desktop
    @smoke
    Scenario: As a automation framework I can scroll to element
      Given I am on the "home" page
          And I scroll to the "contact item" element
