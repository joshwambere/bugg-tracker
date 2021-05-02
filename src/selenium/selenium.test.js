const {Builder,By,Key,until,Capabilities} = require('selenium-webdriver');
const { prepareProfile } = require('selenium-webdriver/firefox');



async function test(){

  let userProfilePath = "/home/johnson/.config/chromium/";
  let chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set("goog:chromeOptions", {
    args: [
        "--lang=en",
        "disable-infobars",
        `user-data-dir=${userProfilePath}`
    ]
  });
   let driver=await new Builder().forBrowser('chrome').withCapabilities(chromeCapabilities).build();
   await driver.get('http://127.0.0.1:5500/public/views/pages/index.html');
 
   
  


 await driver.manage().window().maximize();


 let add=await driver.findElement(By.id('add'));
 
 await driver.wait(until.elementIsVisible(add),5000)
 add.click();
 let title=await driver.findElement(By.id('title'));
 await driver.wait(until.elementIsVisible(title),5000)
 title.sendKeys('okayfine new error')
 let desc=await driver.findElement(By.id('desc'));
 await driver.wait(until.elementIsVisible(desc),5000)
 desc.sendKeys('error description')
 let priority=await driver.findElement(By.id('priority'));
 await driver.wait(until.elementIsVisible(priority),5000)
 priority.sendKeys(Key.TAB)
 priority.sendKeys(Key.PAGE_DOWN)
 priority.sendKeys(Key.ENTER);

 let report=await driver.findElement(By.name('report'));
 await driver.wait(until.elementIsVisible(report),5000);
 report.click();


 //  let login=await driver.findElement(By.id('login-btn'));
//  await driver.wait(until.elementIsVisible(login),3000)
//  login.click()
//  let email=await driver.findElement(By.name('emails'));
//  await driver.wait(until.elementIsVisible(email),3000)
//  email.sendKeys('josh1@gmail.com', Key.TAB);
//  await driver.findElement(By.name('pwds')).sendKeys('okayfine', Key.TAB);
//  await driver.findElement(By.name('login')).click();
//  let from=await driver.findElement(By.id('bug'));
//  let to=await driver.findElement(By.id('testing'));
//  let offset = await to.getRect();
//  let x = await offset.x;
//  let y = await offset.y;
  
//  await driver.actions({async: true}).dragAndDrop(from,{x:parseInt(x), y:parseInt(y)}).perform();
 
//  await driver.actions().move({origin:draggs}).press().perform();
  // let box=await driver.findElement(By.name('fixes'));
  // box.sendKeys(Key.RETURN)
  // let dele =  await driver.findElement(By.name('dele'))
  // await driver.wait(until.elementIsVisible(dele),3000)
  // dele.click();


  // let sourceEle = await driver.findElement(By.id("bug"));
  // await driver.wait(until.elementIsVisible(sourceEle),5000)
  // let targetEle =  driver.findElement(By.id("testing"));
  // let offset = await targetEle.getRect();
  // let x = await offset.x;
  // let y = await offset.y;
  // const actions = driver.actions({async: true});
  // await actions.dragAndDrop(sourceEle, {x:parseInt(x), y:parseInt(y)}).perform();
}

test();