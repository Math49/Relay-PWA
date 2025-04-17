describe("Login Test", () => {
  it("should login successfully", () => {
    cy.visit("http://localhost:3000/login"); // Remplace par ton URL de login
    cy.wait(2000); // Attend 2 secondes pour que la page charge
    cy.get('input[id="name"]').type("admin");
    cy.get('input[id="password"]').type("admin");
    cy.get('button[type="submit"]').click();

    // Attends que la page d'accueil se charge après connexion
    cy.url().should("include", "/"); // ou '/home', ce que ta page affiche après login
    cy.contains("Accueil").should("exist"); // Par exemple vérifier un message d'accueil
  });
});
