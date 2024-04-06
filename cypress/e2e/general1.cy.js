
 
describe('Homepage', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })

    it('should contain banner and text', ()=> {
        cy.get('img').should('be.visible')
        cy.get('h1').should('contain.text', 'BanDekDek Car Rental')  
        cy.get('h3').should('contain.text', 'Come rent your car today')
    })

    it('should contain seven links', ()=>{
        cy.get('a').should('have.length', 7);
    })

    it('should contain link to Cars page', ()=>{
        cy.get('a').as('links');
        cy.get('@links').first().as('Cars');
        cy.get('@Cars').should('have.text', 'Cars')
        cy.get('@Cars').click()
        cy.url().should('include', '/cars');
        cy.get('h1').should('contain.text', 'Our Top Cars')  
        cy.get('img').should('have.length', 4);
    })

})