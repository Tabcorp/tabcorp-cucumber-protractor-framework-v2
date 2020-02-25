Feature: As an automation framework I can verify element visibility

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of an element
      Given I am on the "home" page
        And I can see "1" "add button" buttons

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of a specific element
      Given I am on the "home" page
        And I can see "50" "contact" for specific "item" elements

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of an element is at least a certain number
      Given I am on the "home" page
        And I can see at least "10" "contact item" elements

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of an specific element is at least a certain number
      Given I am on the "home" page
        And I can see at least "10" "contact" for specific "item" elements

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of an element is more than a certain number
      Given I am on the "home" page
        And I can see more than "49" "contact item" elements

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of a specific element is more than a certain number
      Given I am on the "home" page
        And I can see more than "49" "contact" for specific "item" elements

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of element within the element at index
      Given I am on the "home" page
        And I can see "1" "edit" within the "1st" "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the element at index within the element at index
      Given I am on the "home" page
        And I see the "1st" "edit" within the "1st" "contact item"

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of elements that are actually displayed
      Given I am on the "home" page
        And I can see "50" "contact item" elements displayed

    @desktop
    @smoke
    Scenario: As a automation framework I can verify the count of elements within an element at index
      Given I am on the "home" page
        And I can see "1" "edit" within the "1st" "contact item" displayed

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element should and should not be displayed
      Given I am on the "home" page
        And the "add button" element should be displayed
      Then the "hidden div" element should not be displayed

    @desktop
    @smoke
    Scenario: As a automation framework I can verify an element at index should and should not be displayed
      Given I am on the "home" page
         And the "1st" "add button" element should be displayed
      Then the "2nd" "hidden div" element should not be displayed

    @desktop
    @smoke
    Scenario: As a automation framework I can verify a specific element should and should not be displayed
      Given I am on the "home" page
        And the "contact" for specific "item" element should be displayed
      Then the "hidden" for specific "div" element should not be displayed
