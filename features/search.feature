Feature: Search functionality

  Background:
    Given the user is on the login page
    When the user enters a valid username "Admin"
    And the user enters a valid password "admin123"
    And the user clicks the login button
    Then the user should be redirected to the dashboard
    When I navigate to the employee search page

  @smoke @search
  Scenario: Search by valid employee name

    When I search for employee with name "Linda Anderson"
    Then I should see employee "Linda Anderson" in the results

#   @smoke @search
#   Scenario: Search by valid employee ID
#     When I search for employee with ID "0001"
#     Then I should see employee with ID "0001" in the results

#   @regression @search
#   Scenario: Search by partial name
#     When I search for employee with name "Linda"
#     Then I should see at least one employee with name containing "Linda"

#   @regression @search
#   Scenario: Search for non-existent employee name
#     When I search for employee with name "Non Existent User"
#     Then I should see no search results

#   @regression
#   Scenario: Search with empty search criteria
#     When I search without entering any criteria
#     Then I should see all employees listed

#   @regression
#   Scenario: Search by job title
#     When I search for employees with job title "QA Engineer"
#     Then I should see only employees with job title "QA Engineer"

#   @regression
#   Scenario: Search by employment status
#     When I search for employees with status "Full-Time Permanent"
#     Then I should see only employees with status "Full-Time Permanent"

#   @regression
#   Scenario: Search by supervisor name
#     When I search for employees with supervisor name "John Smith"
#     Then I should see only employees whose supervisor is "John Smith"

#   @regression
#   Scenario: Search by combination of name and job title
#     When I search for employee with name "Linda Anderson" and job title "Admin"
#     Then I should see only matching employees
