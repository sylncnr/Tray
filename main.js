const {Builder, By, Key, until} = require('selenium-webdriver');

class TrayIoTest {
    constructor(driver) {
        this.driver = driver;
    }

    async waitAndReturnElement(locator) {
        await this.driver.wait(until.elementLocated(locator), 15000);
        const element = await this.driver.findElement(locator);
        return element;
    }
    
    async clickOnElement(locator) {
        const element = await this.waitAndReturnElement(locator);
        await element.click();
    }
    
    async typeIntoElement(locator, contents) {
        const element = await this.waitAndReturnElement(locator);
        await element.sendKeys(...contents); 
    }
}

(async function main() {
  const driver = await new Builder().forBrowser('firefox').build();
  const test = new TrayIoTest(driver);
  try {
    await driver.get('https://tray.io/');
    await test.clickOnElement(By.css('li.Nav-Item___38VFfN:nth-child(7) > a:nth-child(1)'));
    console.log('Login clicked');
    await driver.wait(until.titleIs('tray.io | Login'), 1000);
    await test.typeIntoElement(By.name('username'), process.env.TRAYIO_USERNAME);
    await test.typeIntoElement(By.name('password'), [process.env.TRAYIO_PASSWORD, Key.RETURN]);

    await test.clickOnElement(By.css('.Page-navigation-button___2nr8D6'));
    console.log('Create Workflow button found');

    await test.typeIntoElement(By.name('name'), ['Hello',Key.RETURN]);

    await test.clickOnElement(By.css('div.Connectors-grid-element___207RbN:nth-child(4)'));
    await test.clickOnElement(By.css('a.button___1PSJhJ:nth-child(3)'));

    const helloOptions = await test.waitAndReturnElement(By.css('.Options-menu-icon___1iiZar'));
    console.log('Option is found');
   
    await driver.executeScript('arguments[0].scrollIntoView()', helloOptions);
    await driver.wait(until.elementIsVisible(helloOptions), 500);
    console.log('scroll down is done');

    await driver.actions().move({origin: helloOptions}).perform();
    console.log('Hoverover okay');

    await test.clickOnElement(By.css('.delete-button'));
    await test.clickOnElement(By.css('div.Dialog-footer-button___31Yis7:nth-child(2)'));
    await test.clickOnElement(By.css('#userToggle'));
    await test.clickOnElement(By.css('li.Profile-DropDown-item___21Tis5:nth-child(2) > a:nth-child(1)'));
    
    await driver.wait(until.titleIs('tray.io | Login'),5000);
    console.log('Test completed successfully.');
  } finally {
    await driver.quit();
  }
})();