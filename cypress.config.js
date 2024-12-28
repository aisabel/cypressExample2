const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin,} = require("@badeball/cypress-cucumber-preprocessor");
const { preprocessor,} = require("@badeball/cypress-cucumber-preprocessor/browserify");

module.exports = defineConfig({
  defaultCommandTimeout:6000,
  //run npm i --save-dev cypress-mochawesome-reporter as prerequisite from terminal
 //npm install -g mochawesome-report-generator
  //also add in e2e.js file import the report
  //npm i --save-dev mochawesome-report-generator
//yarn add -D  mochawesome-report-generator
  reporter: 'cypress-mochawesome-reporter',//calling reporter 
  env:{
    url: "https://rahulshettyacademy.com"
  },
  retries:{
    runMode:1, //retry if failed test
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);//listener

      //preprosesor for cucumber
      async function setupNodeEvents(on, config) {
        // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
        await addCucumberPreprocessorPlugin(on, config);
      
        on("file:preprocessor", preprocessor(config));
      
        // Make sure to return the config object as it might have been modified by the plugin.
        return config;
      }

    },
    
    specPattern: 'cypress/e2e-tests/*.cy.{js,jsx,ts,tsx}',
    //specPattern: 'cypress/integration/examples/*.js',
    screenshotsFolder:'cypress/failures/screenshots',
    experimentalOriginDependencies: true
  },
});

//add cucumber by https://github.com/badeball/cypress-cucumber-preprocessor
//npm install @badeball/cypress-cucumber-preprocessor