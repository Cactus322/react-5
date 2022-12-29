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

            cy.get('.message-error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'background-color', 'rgb(255, 0, 0)')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'r2rr',
                password: 'test',
            }).then((response) => {
                localStorage.setItem(
                    'loggedBlogAppUser',
                    JSON.stringify(response.body)
                )
                cy.visit('http://localhost:3000')
            })
        })

        it('a blog can be created', function () {
            cy.get('.open-form').click()

            cy.get('.blog-title').type('title')
            cy.get('.blog-author').type('author')
            cy.get('.blog-url').type('url')

            cy.get('.blog-create-button').click()

            cy.get('.message-success')
                .should('contain', 'A new blog title by author')
                .and('have.css', 'background-color', 'rgb(0, 255, 0)')

            cy.get('.blog-short-description').should('contain', 'title author')
        })

        it('a likes can be added', function () {
            cy.get('.open-form').click()

            cy.get('.blog-title').type('title')
            cy.get('.blog-author').type('author')
            cy.get('.blog-url').type('url')

            cy.get('.blog-create-button').click()

            cy.get('.show-description-button').click()
            cy.get('.blog-likes button').click()

            cy.get('.blog-likes').should('contain', '1')
        })

        it('a blog can be removed', function () {
            cy.get('.open-form').click()

            cy.get('.blog-title').type('title')
            cy.get('.blog-author').type('author')
            cy.get('.blog-url').type('url')

            cy.get('.blog-create-button').click()

            cy.get('.show-description-button').click()
            cy.get('.blog-remove-button').click()

            cy.get('.blog-list-item').should('not.exist')
        })

        it('likes ordered', function () {
            cy.get('.open-form').click()

            cy.get('.blog-title').type('title')
            cy.get('.blog-author').type('author')
            cy.get('.blog-url').type('url')
            cy.get('.blog-create-button').click()
            cy.get('.show-description-button').click()

            cy.get('.blog-title').type('title')
            cy.get('.blog-author').type('author')
            cy.get('.blog-url').type('url')
            cy.get('.blog-create-button').click()
            cy.get('.show-description-button').click()

            cy.get('.blog-list').eq(1).find('.blog-likes button').click()
            cy.reload()
            cy.get('.blog-list').eq(0).find('.blog-short-description').should('contain', 'titletitle authorauthor')
        })
    })
})
