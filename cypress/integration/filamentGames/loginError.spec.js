/// <reference types="cypress" />

describe("Filament Login Error", () => {

    it("visits localhost", () => {
        cy.visit("http://localhost:3000/")
    })
    it("displays error message after failed login", () => {
        cy.get(".login__submit").click()
        cy.contains("Incorrect username or password", {timeout: 5000})
    })
})