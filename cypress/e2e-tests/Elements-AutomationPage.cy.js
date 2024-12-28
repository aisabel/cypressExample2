/// <reference types="Cypress"/>
import AutomationPracticePage from "../../pageObjects/AutomationPracticePage"

describe('Elements-Automation Page', function() 
{
 
it('Elements-Automation Page',function() {

    //calling required page objects
    const automationPracticePage = new AutomationPracticePage()

    //below instruction is calling cypress.config file and extracting the url
    cy.visit(Cypress.env('url')+"/AutomationPractice/")

    //Find page logo
    automationPracticePage.getLogo().should('exist')

    //Verify 3 elements(buttons) exist in top menu
    automationPracticePage.getMenu().should('have.length', 3)

    //Title visible and contain text
    automationPracticePage.getTitle().should('be.visible').contains('Practice Page')
    
    //check radiobutton and verify is checked
    automationPracticePage.getRadioButtonOne().check().should('be.checked')
    
    //Get suggestion text
    automationPracticePage.getSuggestionClass().type('Netherlands').should('have.value','Netherlands')
    
    //Select option 2 in dropdown
    automationPracticePage.getDropdown().select('option2').should('have.value','option2')
    
    //check and uncheck box
    automationPracticePage.getCheckboxOne().check().should('be.checked').and('have.value','option1')
    automationPracticePage.getCheckboxOne().uncheck().should('not.be.checked')

    //alert text printed in console
    automationPracticePage.getAlertButton().click();
    automationPracticePage.getAlertConfirm().click();

        cy.on('window:alert',(str)=> {
                //mocha validation
                expect(str).to.equals('Hello , share this practice page and share your knowledge');
            })

        cy.on('window:confirm',(str)=>
        {
            expect(str).to.equals('Hello , Are you sure you want to confirm?')

        })

    //show/hide element
    automationPracticePage.getShowButton().click()
    automationPracticePage.getInputShownField().should('be.visible').type('ok!')
    automationPracticePage.getHideButton().click()
    automationPracticePage.getInputShownField().should('not.be.visible')

    //tables
    automationPracticePage.getTableFixed().contains('Businessman').scrollIntoView()
    automationPracticePage.getWebTable().should('be.visible').contains('JMETER')

    //verify in web table price for a given row (Python)
    cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
 
        const text=$e1.text()
        if(text.includes("Python"))
        {
     
            cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
            {
             const priceText=   price.text()
             expect(priceText).to.equal('25')
            })
        }
    })

    //Find MouseHover button 
    automationPracticePage.getMouseHoverButton().scrollIntoView().trigger('mouseover').click()
    //click on 'top' from submenu even if is not visible
    cy.contains('Top').click({force: true})
    //verify url now have #top
    cy.url().should('include','top') 

    //click switch tab button but remove attribute to open in a new tab,
    //therefore tab is opened in the same window
    automationPracticePage.getSwitchTab().invoke('removeAttr','target').click()
    cy.origin("https://www.qaclickacademy.com",()=>
        
        {
            cy.get(".mt-50 h2").should('contain','QAClick Academy');

            /*If page object necessary, then syntaxis would be something like below
                const automationPracticePage = Cypress.require('../../pageObjects/AutomationPracticePage')
                //calling required page object
                //const automationPracticePage = new AutomationPracticePage()

                automationPracticePage.getTabLogo().should('be.visible')
            */
        })
    
    //After redirect revisit the origin url is required
    cy.visit(Cypress.env('url')+"/AutomationPractice/")

    //Find page logo
    automationPracticePage.getLogo().should('exist')

    //verify iframe
    cy.frameLoaded("#courses-iframe").should('be.visible').scrollIntoView()
    cy.iframe().find("a[href*='mentorship']").should('be.visible').eq(0).click()

    //click open pop-up window (dissabled for now)
    //automationPracticePage.getOpenWindow().click()

})

})