Feature: Login Functionality

  @smoke @functional
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid username "Admin"
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then the user should be redirected to the dashboard

  @regression @edge
  Scenario: Login with case-insensitive username
    Given the user is on the login page
    When the user enters a valid username "admin"
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then the user should be redirected to the dashboard

  @negative @edge
  Scenario: Login with leading and trailing spaces in username
    Given the user is on the login page
    When the user enters a valid username "  Admin  "
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then an error message "Invalid credentials" should be displayed

  @negative
  Scenario: Login with invalid username
    Given the user is on the login page
    When the user enters an invalid username "WrongUser"
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then an error message "Invalid credentials" should be displayed

  @negative
  Scenario: Login with invalid password
    Given the user is on the login page
    When the user enters a valid username "Admin"
    And the user enters an invalid password "wrongpass"
    And the user clicks the login button
    Then an error message "Invalid credentials" should be displayed

  @negative
  Scenario: Login with both username and password invalid
    Given the user is on the login page
    When the user enters an invalid username "User123"
    And the user enters an invalid password "Pass123"
    And the user clicks the login button
    Then an error message "Invalid credentials" should be displayed

  @negative
  Scenario: Login with empty username
    Given the user is on the login page
    When the user leaves the username field empty
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then required field error should be displayed for "username"

  @negative
  Scenario: Login with empty password
    Given the user is on the login page
    When the user enters a valid username "Admin"
    And the user leaves the password field empty
    And the user clicks the login button
    Then required field error should be displayed for "password"

  @negative
  Scenario: Login with both fields empty
    Given the user is on the login page
    When the user leaves the username field empty
    And the user leaves the password field empty
    And the user clicks the login button
    Then required field error should be displayed for both username and password

#   @regression @edge
#   Scenario: Login session timeout after inactivity
#     Given the user is logged in
#     When the user remains inactive for "30 minutes"
#     Then the session should expire
#     And the user should be redirected to the login page
#     And an error message "Session expired. Please login again." should be displayed

#   @regression @edge
#   Scenario: Login after password reset
#     Given the user has reset their password to "newpass123"
#     When the user enters a valid username "Admin"
#     And the user enters the new password "newpass123"
#     And the user clicks the login button
#     Then the user should be redirected to the dashboard
