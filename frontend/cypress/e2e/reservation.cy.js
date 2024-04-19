
const ae1 = 'Admin1@gmail.com'
const ap1 = '12345678'  

describe('Making a reservation', () => {

    beforeEach(()=>{
    cy.visit('http://localhost:3000');
    cy.get('[title="User page"]').click();
    cy.url().should('include', 'signIn');
    cy.get('#email').type(ae1);
    cy.get('#password').type(ap1);
    cy.get('#signin').click();   
    cy.get('#username').should('contain.text', 'Welcome Admin1');
    })
    
    it('should display name on home page', ()=> {
        cy.get('[title="Make Reservation"]').click();
        cy.url().should('include', 'reservation');
        cy.get("#shopSelect").select(1);
        cy.get("#carSelect");
        
    })
    

    
})