Feature: As an automation framework I can verify element value

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element contains and does not contain the text
      Given I am on the "home" page
          And the "contacts header" contains the text "Contacts"
          And the "contacts header" does not contain the text "French Revolution"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element at index contains and does not contain the text
      Given I am on the "home" page
          And the "1st" "contact item" contains the text "Abdul Gonzales"
          And the "1st" "contact item" does not contain the text "Jacques Necker"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element with dynamic element data id contains and does not contain the text
      Given I am on the "home" page
          And the "contact" for specific "item" contains the text "Abdul Gonzales"
          And the "contact" for specific "item" does not contain the text "Jacques Necker"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element with dynamic element data id contains the attribute and does contain the attribute
      Given I am on the "home" page
          And the "contact" for specific "item" contains the "name" attribute "contact"
          And the "contact" for specific "item" does not contain the "name" attribute "blah"

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
          And the "contact item" does not contain the "img" attribute

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element attribute contains the text and does not contain the text
      Given I am on the "home" page
          And the "edit button" contains the "name" attribute "edit"
          And the "edit button" does not contain the "name" attribute "delete"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element at index's attribute contains the text and does not contain the text
      Given I am on the "home" page
          And the "2nd" "contact item" contains the "name" attribute "contact-item"
          And the "2nd" "contact item" does not contain the "name" attribute "contact-piece"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an input has the exact text
      Given I am on the "home" page
        And I fill in the "search" input with "Louis XVI"
      Then the "search" input should equal the value "Louis XVI"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an input contains the text
      Given I am on the "home" page
        And I fill in the "search" input with "Louis XVI"
      Then the "search" input contains the value "XVI"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an input has the exact text
      Given I am on the "home" page
        And the "edit" element within the "3rd" "contact item" element contains the "name" attribute "edit"
      Then the "edit" element within the "3rd" "contact item" element does not contain the "name" attribute "delete"