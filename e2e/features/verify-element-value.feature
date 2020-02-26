Feature: As an automation framework I can verify element value

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element contains and does not contain the text
      Given I am on the "home" page
          And the "contacts header" contains the text "Contacts"
      Then the "contacts header" does not contain the text "French Revolution"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element at index contains and does not contain the text
      Given I am on the "home" page
          And the "1st" "contact item" contains the text "Vulputate Street"
      Then the "1st" "contact item" does not contain the text "Jacques Necker"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element with dynamic element data id contains and does not contain the text
      Given I am on the "home" page
          And the "contact" for specific "item" contains the text "Vulputate Street"
      Then the "contact" for specific "item" does not contain the text "Jacques Necker"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element with dynamic element data id contains the attribute and does contain the attribute
      Given I am on the "home" page
          And the "contact" for specific "item" contains the "name" attribute "contact"
      Then the "contact" for specific "item" does not contain the "name" attribute "blah"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element does not contain text
      Given I am on the "home" page
         And the "search" contains no text

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element contains an attribute type and does not contain an attribute type
      Given I am on the "home" page
          And the "contact item" contains the "name" attribute
      Then the "contact item" does not contain the "img" attribute

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element attribute contains the text and does not contain the text
      Given I am on the "home" page
          And the "edit button" contains the "name" attribute "edit"
      Then the "edit button" does not contain the "name" attribute "delete"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element at index's attribute contains the text and does not contain the text
      Given I am on the "home" page
          And the "2nd" "contact item" contains the "name" attribute "contact-item"
      Then the "2nd" "contact item" does not contain the "name" attribute "contact-piece"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element has the exact value
      Given I am on the "home" page
        And I fill in the "search" input with "Louis XVI"
      Then the "search" equals the value "Louis XVI"
        And the "search" does not equal the value "LOUIS XXVI"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element contains the value
      Given I am on the "home" page
        And I fill in the "search" input with "Louis XVI"
      Then the "search" contains the value "XVI"
        And the "search" does not contain the value "XXVI"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element within an element contains the attribute and does not contain the attribute
      Given I am on the "home" page
        And the "edit" element within the "3rd" "contact item" element contains the "name" attribute "edit"
      Then the "edit" element within the "3rd" "contact item" element does not contain the "name" attribute "delete"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the select box option contains the text
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And I select the "gender" as "female"
      Then the "2nd" "gender" option contains the text "Female"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the last option of a select contains
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And the last "gender" dropdown contains the text "Other"

    @desktop
    @smoke
    Scenario: As a automation framework I can count how many options a select contains
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And the "gender" dropdown contains a total of "3" options