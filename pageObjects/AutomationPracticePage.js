class AutomationPracticePage{
    getLogo(){
        return cy.get('.logoClass')
    }

    getMenu(){
        return cy.get('.jumbotron > div >button')
    }
    
    getTitle(){
        return cy.get('h1')
    }

    getRadioButtonOne(){
        return cy.get('[for="radio1"] > .radioButton')
    }

    getSuggestionClass(){
        return cy.get('input[id="autocomplete"]')
    }

    getDropdown(){
        return cy.get('select')
    }

    getCheckboxOne(){
        return cy.get('input[id="checkBoxOption1"]')
    }

    getOpenWindow(){
        return cy.get('#openwindow')
    }

    getSwitchTab(){
        return cy.get('#opentab')
    }
    getTabLogo(){
        return cy.get('.header-logo-support > .container > .row > .col-lg-4')
        //cy.get('img[alt="Logo"]')
    }

    getAlertButton(){
        return cy.get('#alertbtn')
    }

    getAlertConfirm(){
        return cy.get('[value="Confirm"]')
    }

    getShowButton(){
        return cy.get('input[id="show-textbox"]')
    }
    getHideButton(){
        return cy.get('input[id="hide-textbox"]')
    }

    getInputShownField(){
        return cy.get('#displayed-text')
    }

    getWebTable(){
        return cy.get('fieldset > #product')
    }
    getTableFixed(){
        return cy.get('.tableFixHead')
    }

    getMouseHoverButton(){
        return cy.get('#mousehover')
    }

}
export default AutomationPracticePage;