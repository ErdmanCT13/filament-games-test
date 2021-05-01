
describe("Filament Google Login", () => {

    it("visits localhost", () => {
        cy.visit("http://localhost:3000/")
    })
    it("redirects to user page after valid login", () => {
        cy.get(".login__google").click()
        cy.url().should("eq", "http://localhost:3000/user")
    })
})