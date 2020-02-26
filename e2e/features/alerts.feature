Feature: As an automation framework I can verify alerts

    @desktop
    @smoke
    Scenario: As a automation framework I can accept an alert dialog
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And I fill in the "name" input with "Lazare Carnot"
      Then I fill in the "phone" input with "+33 1 30 83 78 00"
        And I fill in the "street" input with "Place d'Armes, 78000 Versailles"
        And I fill in the "city" input with "France"
        And I click the "submit" button
        And I am directed to the "home" page
        And I can see "51" "contact item" elements displayed
        And I fill in the "search" input with "not"
        And I click the "delete" button
        And I accept the alert dialog
        And the "contact item" element should not be present

    @desktop
    @smoke
    Scenario: As a automation framework I can dismiss an alert dialog
      Given I am on the "home" page
        And I click the "add button" button
      When I am directed to the "add record" page
        And I fill in the "name" input with "Lazare Carnot"
      Then I fill in the "phone" input with "+33 1 30 83 78 00"
        And I fill in the "street" input with "Place d'Armes, 78000 Versailles"
        And I fill in the "city" input with "France"
        And I click the "submit" button
        And I am directed to the "home" page
        And I can see "51" "contact item" elements displayed
        And I fill in the "search" input with "not"
        And I click the "delete" button
        And I dismiss the alert dialog
        And the "contact item" element should be present