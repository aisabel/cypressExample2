Feature: End to end ecommerce validation

Scenario: ecommerce products delivery
Given open ecommerce page
When I add items to Cart
And validate the total prices
Then select the country submit and verify thank you message

