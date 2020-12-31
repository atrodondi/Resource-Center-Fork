const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

let date = new Date();
let time = date.getTime();

describe("Register New User", () => {
  it("should register a new user to the app, and bring user to dashboard/homescreen where they see a welcome message", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      // try to log in and act as a registering user
      await driver.get("http://localhost:3000/");

      //click register button to open register form
      await (await driver.findElement(By.name("register"))).click();
      // sending keys to the new email input field
      await driver
        .findElement(By.name("regEmail"))
        .sendKeys("newUser" + time + "@gmail.com");
      // sending keys to the new username field
      await driver
        .findElement(By.name("regUsername"))
        .sendKeys("newUsername" + date);
      //sending keys to the new password field
      await driver
        .findElement(By.name("regPassword"))
        .sendKeys("password" + date);
      //hitting submit button to complete the form
      await (await driver.findElement(By.className("btn-primary"))).click();

      //wait for the submit button pusb to register and grab the welcome message that matches the new registered user, confirming that user registration has been successful
      await driver.wait(until.elementLocated(By.css("h2.welcoming")), 10000);
      let text = await (await driver.findElement(By.css("h2"))).getText();
      assert(text, "Welcome, newUsername" + date);
    } finally {
      await driver.quit();
    }
  });
});
