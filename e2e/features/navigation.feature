Feature: As an automation framework I can navigate the application

    @desktop
    @smoke
    Scenario: As a automation framework I navigate to the page
      Given I navigate to the "home" page
        Then I see the "Contacts" page title

    @desktop
    @smoke
    Scenario: As a automation framework I can refresh the page
      Given I navigate to the "home" page
        And I see the "Contacts" page title
      Then the "contacts header" contains the text "Contacts"
        And I refresh the page
        And the "contacts header" contains the text "Contacts"

    @desktop
    @smoke
    Scenario: As a automation framework I navigate directly to a url
      Given I navigate to the URL "/tasks/create"
        And I am directed to the "add record" page
      Then the "gender" dropdown contains a total of "3" options