// https://docs.cypress.io/api/introduction/api.html

describe("Home view", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("check main content", () => {
    cy.contains("h1", "You did it!");
  });

  it("check info list", () => {
    cy.contains("h3", "Documentation");
    cy.contains("h3", "Tooling");
    cy.contains("h3", "Ecosystem");
    cy.contains("h3", "Community");
    cy.contains("h3", "Support Vue");
  });

  it("route to about page", () => {
    cy.contains("a", "About").click();
  });
});
