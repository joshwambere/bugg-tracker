const {Builder,By} = require('selenium-webdriver');



async function test(){

   
   let driver=await new Builder().forBrowser('chrome').build();
   await driver.get('https://www.w3schools.com/html/html5_draganddrop.asp');
 
   
  let sourceEle = driver.findElement(By.id("drag1"));
  let targetEle = driver.findElement(By.id("div2"));
  let offset = await targetEle.getRect();
  let x = await offset.x;
  let y = await offset.y;
  const actions = driver.actions({async: true});
  // Performs dragAndDropBy onto the  target element offset position
  await actions.dragAndDrop(sourceEle, targetEle).perform();
 
//  let from=await driver.findElement(By.id('bug'));
//  let to=await driver.findElement(By.id('testing'));
//  let offset = await to.getRect();
//     let x = await offset.x;
//     let y = await offset.y;
  
//  await driver.actions({async: true}).dragAndDrop(from,{x:parseInt(x), y:parseInt(y)}).perform();
 
//  await driver.actions().move({origin:draggs}).press().perform();

  
  // const actions = driver.actions();
  // actions.clickAndHold(await driver.findElement(By.name('dragg')))
  // driver.actions().dragAndDrop   = driver.actions().clickAndHold(await driver.findElement(By.id('bug')))
  // .moveToElement(await driver.findElement(By.id('fixing')))
  // .release(await driver.findElement(By.id('bug'))).build();
  // // actions.dragAndDrop
  // dragAndDrop.perform();
  // await driver.findElement(By.id('bug'))
   
  //  await (await driver.findElement(By.name('back'))).click();
  //  await (await driver.findElement(By.name('complete'))).click();

  // driver.actions().dragAndDrop(await driver.findElement(By.name('dragg')),driver.findElement(By.id('fixing'))).perform();
 
  
}

test();