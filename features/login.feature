Feature: Login Functionality

  Scenario: Successful login
    Given I open the login page
    When I login with username "Admin" and password "admin123"
    Then I should see the dashboard page

#   Scenario: Failed login
#     Given I open the login page
#     When I login with username "wrong" and password "wrongpass"
#     Then I should see an error message "Invalid credentials"