Feature: As an automation framework I can navigate to the home page

    @desktop
    @smoke
    Scenario: As a automation framework I can navigate to the home page and check the header is as expected
        Given I am on the "home" page
        And the "contacts header" contains the text "Contacts"