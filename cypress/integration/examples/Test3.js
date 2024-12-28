describe('Handling Child Windows', () => {
    //handle pop-ups
    it('Should handle child window', () => {
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        //handling alert button
        //the alert text is also automatically displayed in the log
        cy.get('#alertbtn').click();
        cy.get('[value="Confirm"]').click();

        cy.on('window:alert',(str)=> {
                //mocha validation
                expect(str).to.equals('Hello , share this practice page and share your knowledge');
            })

        cy.on('window:confirm',(str)=>
        {
            expect(str).to.equals('Hello , Are you sure you want to confirm?')

        })
 
        //navigate to a new page
        cy.get("#opentab").invoke('removeAttr','target').click();
 
        cy.origin("https://www.qaclickacademy.com",()=>
        {
         cy.get("#navbarSupportedContent a[href*='about']").click();
         cy.get(".mt-50 h2").should('contain','QAClick Academy');
 
         })
    });
 
});