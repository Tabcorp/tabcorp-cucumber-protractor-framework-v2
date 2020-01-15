Feature: As an automation framework I can verify element presence

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element contains an element and does not contain an element
      Given I am on the "home" page
          And the "contacts header" contains the text "Contacts"
      Then the "contacts header" does not contain the text "French Revolution"
        And the "1st" "contact item" contains the "edit" element
        And the "1st" "contact item" does not contain the "contacts header" element

    @desktop
    @smoke
    Scenario: As a automation framework I can verify a specific element contains an element and does not contain an element
      Given I am on the "home" page
        And the "1st" "contact" for specific "item" contains the "edit" element
      Then the "1st" "contact" for specific "item" does not contain the "contacts header" element

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element with a specific element does and and does not contain an element
      Given I am on the "home" page
        And the "1st" "contact item" contains the "full name" for specific "label" element
      Then the "1st" "contact item" does not contain the "full name" for specific "checkbox" element

    @desktop
    @smoke
    Scenario: As a automation framework I can verify a specific element contains and does not contain a specific element
      Given I am on the "home" page
        And the "1st" "contact" for specific "item" contains the "full name" for specific "label" element
      Then the "1st" "contact" for specific "item" does not contain the "full name" for specific "checkbox" element

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an email contains a count of an element
      Given I am on the "home" page
        And the "1st" "contact item" contains "1" "edit" element
      Then the "1st" "contact item" contains "1" "edit" element

    @desktop
    @smoke
    Scenario: As an automation framework I can an element containing the text contains the element
      Given I am on the "home" page
        And the "content" containing the text "Abraham Perry" has a "inner content" element

    @desktop
    @smoke
    Scenario: As an automation framework I expect the element to be present
      Given I am on the "home" page
        And the "search" element should be present
      And the "help" element should not be present

    @desktop
    @smoke
    Scenario: As an automation framework I expect the element to be present
      Given I am on the "home" page
        And the "search" element should be present
      And the "help" element should not be present

    @desktop
    @smoke
    Scenario: As an automation framework I expect the specific element to be present and not to be present
      Given I am on the "home" page
        And the "contact" for specific "item" element should be present
      Then the "full name" for specific "checkbox" element should not be present

    @desktop
    @smoke
    Scenario: As an automation framework I expect an element at index to be present and not to be present
      Given I am on the "home" page
        And the "1st" "contact item" element should be present
      Then the "2nd" "search" element should not be present

    @desktop
    @smoke
    Scenario: As an automation framework I expect an element at index to be present and not to be present
      Given I am on the "home" page
        And the "edit" element within the "contact item" should be present
      Then the "search" element within the "contact item" should not be present
