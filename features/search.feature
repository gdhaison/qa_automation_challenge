Feature: Employee Search


  Background:
    Given the user is logged in with account "admin" password "admin123"

  @smoke @search
  Scenario: Search by valid employee full name
    When I search for employee with name "Rebecca Harmony"
    Then I should see employee "Rebecca" in the results

  @smoke @search
  Scenario: Search by valid employee partial name
    When I search for employee with name "Rebecca"
    Then I should see employee "Rebecca" in the results

  @regression @search @negative
  Scenario: Search by name with extra spaces
    When I search for employee with name "   Rebecca   Harmony   "
    Then I shouldnt see employee "Rebecca" in the results

  @regression @search
  Scenario: Search by lowercase name
    When I search for employee with name "rebecca harmony"
    Then I should see employee "Rebecca" in the results

  @regression @search
  Scenario: Search for non-existing employee
    When I search for employee with name "NoSuchName"
    Then I should see no results displayed

  @regression @search
  Scenario: Search by Employee ID
    When I search for employee with ID "0363"
    Then I should see employee "Christopher" in the results

  @regression @search
  Scenario: Search by Sub Unit
    When I search for employee in sub unit "Engineering"
    Then all results should belong to sub unit "Engineering"

  @regression @search
  Scenario: Search by multiple filters combined
    When I search for employee with name "Rebecca" and job title "QA Engineer" and sub unit "Quality Assurance"
    Then all results should match name "Rebecca" and job title "QA Engineer" and sub unit "Quality Assurance"

  @regression @search
  Scenario: Search with no filters
    When I click the search button without entering any filters
    Then the system should display all employees

  @edge @search
  Scenario: Search with leading and trailing special characters
    When I search for employee with name "***Rebecca Harmony###"
    Then I shouldnt see employee "Rebecca" in the results

  @edge @search
  Scenario: Search with only spaces
    When I search for employee with name "     "
    Then I should see no results displayed

  @edge @search
  Scenario: Search with extremely long string
    When I search for employee with name "o4W9uKJ6vbN7zE3cQxY2tP1LhM5rB8dA0fVgZsUjXlHnTqCpRyWeIkOmSaFbGcZdXyVwTuRqPoNmLkJiHgFfDdSsAaZzXxCcVvBbNnMmLlKkJjHhGgFfDdSsAaZzXxWwVvUuTtRrQqPpOoIiUuYyTtRrEeWwQqSsAaZzXxCcVvBbNnMmLlKkJjHhGgFfDdSsAaZzXxWwVvUuTtRrQqPpOoIiUuYyTtRrEeWwQq"
    Then I should see "Should not exceed 100 characters" alert

  @edge @search
  Scenario: Search by mixed case name
    When I search for employee with name "RebEcca hArmOny"
    Then I should see employee "Rebecca" in the results

  @edge @search1
  Scenario: Search by partial last name
    When I search for employee with name "Harmony"
    Then I should see employee "Rebecca" in the results
