
describe("Filament Login", () => {

    it("visits localhost", () => {
        cy.visit("http://localhost:3000/")
    })
    it("redirects to user page after valid login", () => {
        cy.get(".login__username-field input").type("erdman_carl@hotmail.com")
        cy.get(".login__password-field input").type("password")
        cy.get(".login__submit").click()
        cy.url({timeout: 10000}).should("eq", "http://localhost:3000/user")
    })
})