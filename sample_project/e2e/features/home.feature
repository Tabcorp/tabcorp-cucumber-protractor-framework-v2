Feature: As a user I can see the prizes page

  @smoke
  @desktop
  Scenario: As a user I can go to the prizes page
    Given I navigate to the "Home" page
    When I click the "Prizes" link
    And I am directed to the "prizes" page
    Then the "first prize" element should be present
    And the "second prize" element should be present
    And the "third prize" element should be present
    And the "fourth prize" element should be present
    And the "fifth prize" element should be present


