const {Builder,By, Key, until } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
require ('chromedriver');


async function test(){

   let chromeOptions = new chrome.Options();
   chromeOptions.addArguments("--enable-javascript");
   let driver=await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
   await driver.get('http://localhost:8080/');
 
   await driver.manage().window().maximize();
   
   await driver.findElement(By.name('id')).sendKeys('21125', Key.TAB);
   await driver.findElement(By.name('names')).sendKeys('John Doe', Key.TAB);
  
   await (await driver.findElement(By.name('selectOpt'))).sendKeys('m',Key.RETURN,Key.RETURN,Key.TAB);
  
   await (await driver.findElement(By.name('birthday'))).sendKeys('09252000',Key.TAB,Key.RETURN);
   
   await (await driver.wait(until.elementLocated(By.name("add")), 1000));
   await (await driver.findElement(By.name('add'))).click();
   
   
   await (await driver.findElement(By.name('details'))).click();
   await (await driver.findElement(By.name('back'))).click();
   await (await driver.findElement(By.name('complete'))).click();
 
  await driver.quit(); 
}

test();