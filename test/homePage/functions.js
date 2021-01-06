const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");

module.exports = {
  // adding a new resource to the database
  addNewResource: async driver => {
    //   finding the add new resource btn and clicking to open the modal to access the form
    await driver.wait(until.elementLocated(By.name("addNewResource")), 4000);
    await driver.findElement(By.name("addNewResource")).click();
    // sending test title to title field
    let title = "Test Title For New Resource";
    let joinedTitle = await title.split(" ").join("").toLowerCase();

    await driver.findElement(By.name("title")).sendKeys(title);
    // send test link to link field
    await driver
      .findElement(By.name("link"))
      .sendKeys("http://www.wikipedia.com");
    // choose a category for the new resource
    await driver.findElement(By.name("category")).sendKeys("Research");
    // adding a test description for new resource
    await driver
      .findElement(By.name("description"))
      .sendKeys(
        "This is a test description for the new resource created during the test"
      );
    // clicking submit key to add the new resource to DB
    await driver.findElement(By.name("submitResource")).click();
    await driver.wait(until.elementLocated(By.id(joinedTitle)), 10000);
    // look for new resource after it was created
    let newTitle = await driver.findElement(By.id(joinedTitle)).getText();

    // expecting the title of the newly created resource to match what was entered into form to confirm new resource was added
    expect(newTitle.split(" ").join("").toLowerCase()).to.equal(joinedTitle);
  }
};
