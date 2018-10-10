const {Builder, By, Key, until} = require('selenium-webdriver');

async function waitAndReturnElement(driver, locator) {
    await driver.wait(until.elementLocated(locator), 15000);
    const element = await driver.findElement(locator);
    return element;
}

async function clickOnElement(driver, locator) {
    const element = await waitAndReturnElement(driver, locator);
    await element.click();
}

async function typeIntoElement(driver, locator, contents) {
    const element = await waitAndReturnElement(driver, locator);
    await element.sendKeys(...contents); 
}

(async function trayIoTest() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://tray.io/');
    await clickOnElement(driver, By.css('li.Nav-Item___38VFfN:nth-child(7) > a:nth-child(1)'));
    console.log('Login clicked');
    await driver.wait(until.titleIs('tray.io | Login'), 1000);
    await typeIntoElement(driver, By.name('username'), 'seylancinar@gmail.com');
    await typeIntoElement(driver, By.name('password'), ['12345678', Key.RETURN]);

    await clickOnElement(driver, By.css('.Page-navigation-button___2nr8D6'));
    console.log('Create Workflow button found');

    await typeIntoElement(driver, By.name('name'), ['Hello',Key.RETURN]);

    await clickOnElement(driver, By.css('div.Connectors-grid-element___207RbN:nth-child(4)'));
    await clickOnElement(driver, By.css('a.button___1PSJhJ:nth-child(3)'));

    await driver.wait(until.elementLocated(By.css('.Options-menu-icon___1iiZar')) ,5000);
    const helloOptions = await driver.findElement(By.css('.Options-menu-icon___1iiZar'));
    console.log('Option is found');
    // Asagidaki kodu tarayici icinde calistirip bekliyoruz
    await driver.executeScript('arguments[0].scrollIntoView()', helloOptions);
    await driver.wait(until.elementIsVisible(helloOptions), 500);
    console.log('scroll down is done');
    // Fareyi menu uzerine getir
    await driver.actions().move({origin: helloOptions}).perform();
    console.log('Hoverover okay');

    await clickOnElement(driver, By.css('.delete-button'));
    await clickOnElement(driver, By.css('div.Dialog-footer-button___31Yis7:nth-child(2)'));
    await clickOnElement(driver, By.css('#userToggle'));
    await clickOnElement(driver, By.css('li.Profile-DropDown-item___21Tis5:nth-child(2) > a:nth-child(1)'));
    
    await driver.wait(until.titleIs('tray.io | Login'),5000);


    //await a.sendKeys('webdriver', Key.RETURN);
   
  } finally {
    // await driver.quit();
  }
})();