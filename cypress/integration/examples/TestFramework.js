/// <reference types="Cypress"/>
import HomePage from "../../../pageObjects/HomePage"
import ProductPage from "../../../pageObjects/ProductPage"

describe("test framework", function(){
    before(function(){
        //calls example.json that contains data
        cy.fixture('example').then(function(data){
            //access to the entire class    
            this.data=data
        })
    })
    it("My first testcase",function(){
        //timeouts for specific test is defined like this:
        //Cypress.config('defaultCommandTimeout',8000)
        const homePage = new HomePage()
        const productPage = new ProductPage()

        //below instruction is calling cypress.config file and extracting the url
        cy.visit(Cypress.env('url')+"/angularpractice/")
        
        homePage.getEdittBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEdittBox().should('have.attr','minlength','2')
        homePage.getEntrepreneur().should('be.disabled')
        homePage.getShopTab().click()
        //this.data.productName ===> this should be using commands.js however does not recognice el var
       /* this.data.productName.forEach(function(element){
            cy.selectProduct(element)
        })
        

       /*homePage.getCardTitle().each(($el, index, $list) => {
            if ($el.text().includes('Blackberry')){
                cy.get('button.btn.btn-info').eq(index).click()
            }
        })*/

        this.data.productName.forEach(function(element){
            cy.selectProduct(element)
        });
        productPage.checkOutButton().click()
        //below logic is to get quantities and sum them after
        var sum=0
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

        cy.contains('Checkout').click()
        cy.get('#country').type("India")
        cy.get('.suggestions > ul > li > a').click()
        cy.get('.checkbox > label').click()
        cy.get('input[type="submit"]').click()
        cy.get('.alert').contains('Success! Thank you! Your order will be delivered in next few weeks :-)')
        /*cy.get('.alert').then(function(element))
        {
            //with this instructions you find also the text that contains success text
            const actualText=element.text()
            expect(actualText.includes("Success")).to.be.true
                
            }
        }*/

    })

})