//@ts-check
const {test }  = require('@playwright/test');
//adding fixtures browser and page to test function

test('Launch Site',async({page})=>{
   await page.goto('https://www.amazon.com');
   //launching the broswer page fixture is already created and passed to test function
});
