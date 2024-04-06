        const ue1 = 'testuser1@gmail.com'
        const up1 = 'TE5st@r+'
        const ae1 = 'Admin1@gmail.com'
        const ap1 = '12345678'     

describe('User log in', () => {

    beforeEach(()=>{
        cy.visit('http://localhost:3000');
        cy.get('[title="User page"]').click();
        cy.url().should('include', 'signIn');
        cy.get('#email').type(ue1);
        cy.get('#password').type(up1);
        cy.get('#signin').click();      
    })

    it('should display name on home page', ()=> {
        cy.get('#username').should('contain.text', 'Welcome Courtney Dibbert')  
    })

    it('should be able to log out', ()=> {
        cy.get('[title="Sign out"]').click();  
        cy.get('#submitButton').click();
        cy.url().should('eq', 'http://localhost:3000/');
        cy.get('#username').should('not.exist')
    })

})


describe('Admin log in', () => {

    beforeEach(()=>{
        cy.visit('http://localhost:3000');
        cy.get('[title="User page"]').click();
        cy.url().should('include', 'signIn');
        cy.get('#email').type(ae1);
        cy.get('#password').type(ap1);
        cy.get('#signin').click();    
        cy.url().should('eq', 'http://localhost:3000/');  
    })

    it('should be able to view bookings', ()=>{
        cy.get('[title="User page"]').click();
        cy.url().should('include', 'user');
        cy.get('input[type="checkbox"]').click();
        cy.get('tr').should('have.length.gt', 4);
    })

})

