import {Given} from "cypress-cucumber-preprocesor/steps";
const homePage = new HomePage()
const productPage = new ProductPage()

Given('open ecommerce page',() =>{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

When('I add items to Cart',() =>{
    homePage.getShopTab().click()
    this.data.productName.forEach(function(element){
        cy.selectProduct(element)
    })
    productPage.checkOutButton().click()
})

And('validate the total prices',() =>{
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) =>{
        //print quantity with currency sign cy.log($el.text())
        const actualText=$el.text()
        var result=actualText.split(" ")
        result=result[1].trim()
        //without currency sign
        cy.log(result)
        sum=Number(sum)+Number(result) //adding number converts the string to number
        
        //resolve the promise
    }).then(function(){
        cy.log(sum)
    })

    cy.get('h3 strong').then(function(element){
        const amount=element.text()
        var result= amount.split(" ")
        var total=result[1].trim()
        expect(Number(total)).to.equal(sum)
    })
})

Then('select the country submit and verify thank you message',() =>{  
    cy.contains('Checkout').click()
    cy.get('#country').type("India")
    cy.get('.suggestions > ul > li > a').click()
    cy.get('.checkbox > label').click()
    cy.get('input[type="submit"]').click()
    cy.get('.alert').contains('Success! Thank you! Your order will be delivered in next few weeks :-)')

})