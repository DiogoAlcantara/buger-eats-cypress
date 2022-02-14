describe('Home page', () =>{
    it('Testando se o app está online', () =>{
        cy.visit('/')
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})

