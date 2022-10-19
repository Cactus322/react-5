describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'r2rr',
            name: 'test',
            passwordHash: 'test',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('.username')
        cy.get('.password')
        cy.get('.login-button')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('.username').type('r2rr')
            cy.get('.password').type('test')
            cy.get('.login-button').click()
            cy.get('.logount-button').click()
        })

        it('fails with wrong credentials', function () {
            cy.get('.username').type('r2rr')
            cy.get('.password').type('tst')
            cy.get('.login-button').click()

            cy.get('.message-error').should('contain', 'Wrong credentials')
            cy.get('.message-error').should('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
    })
})
