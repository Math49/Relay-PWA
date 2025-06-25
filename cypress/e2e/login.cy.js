describe("Login Test", () => {
  it("should login successfully", () => {
    cy.visit("http://localhost:3000/login");
    cy.wait(2000);
    cy.get('input[id="name"]').type("admin");
    cy.get('input[id="password"]').type("admin");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
    cy.contains("Accueil").should("exist");
  });
});
