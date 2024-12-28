describe('iFrames', function() 
{
 
it('iFrames',function() {
 
//iframes
cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

cy.frameLoaded("#courses-iframe")

cy.iframe().find("a[href*='mentorship']").eq(0).click();
cy.wait(4000);
cy.iframe().find("h1[class*='pricing-title']").should('have.length',2);
})
 
 
})
 