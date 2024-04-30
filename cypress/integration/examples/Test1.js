//cypress first test - spec
describe('My first test suite',function(){
    it('My first testcase',function(){
        //Write the test steps here
        //cy reserved word is the method to help you navigate throw the browser
        //cy invoke any cypress command. Is like driver.get element in Selenium
        //cy command comes by default without any extra definition or declaration
        
        //cy.visit navigates to url
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    
        //Cypress only support cssSelectors
        //id =#idname
        //classname = .classname
        //tagname.classname
        //tagname[attribute=value] example: input[type='search']
        //tagname to traverse throw elements add space between them.Example: form input
    
        //Search on the entire page without filter
        cy.contains('ADD TO CART');

        //get is a method which get the locator present on your webpage
        cy.get('.search-keyword').type('ca');
        cy.wait(2000);

        //check that currently there are 4 products visible on the screen
        //should is the assertion type of chai framework
        cy.get('.product:visible').should('have.length',4);
        //parent child chaining
        cy.get('.products').find('.product').should('have.length',4);

        cy.get(':nth-child(3) > .product-action > button').click();

        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click();
        
        //run every time for each element in the list
        //below find the element and click on element button
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const textVeg=$el.find('h4.product-name').text()
            if(textVeg.includes('Cashews')){
                cy.wrap($el.find('button'));
            }
        });

        //get logo text 
        //then method resolve the promise and then grab the text and print in the input
        //no cypress commands cannot resolve promise by themselves. We need to manually resolve them with method then()
        cy.get('.brand').then(function(logoelement){
            //cy.log will print in the cypress test log information
            //console.log(); prints in browser console log
            cy.log(logoelement.text());

        })


    })
    //add more test cases with reserved word 'it'
})