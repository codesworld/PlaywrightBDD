Feature: User Authentication tests

  Background:
    Given User on the page
    And User click on the login link

  Scenario: Login should be successful
    Given User enter the email
    And User enter the password 
    When User click on the login button
    Then User send the mfa code
    And User click on verify button
    And User see the url 

    Scenario: Login should not be successful
    Given User enter the email
    And User enter the password 
    When User click on the login button
    Then User send the mfa code
    And User click on verify button
    And User see the message


