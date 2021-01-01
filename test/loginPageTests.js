const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

module.exports = {
  userLogin: async function () {
    // test to make sure a user can login to an existing account
    describe("Existing User login", () => {
      it("should log user in using existing user account and land existing user on home page/dashboard", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          await driver.get("http://localhost:3000/");
          // submitting login form
          submitForm(driver);
          //   getting welcome message after sucessful login
          getWelcomeMsg(driver);
        } finally {
          await driver.quit();
        }
      });
    });

    let submitForm = async (driver) => {
      // enter keys to username input field
      await driver.findElement(By.name("logUsername")).sendKeys("test");

      //enter keys to password input field
      await driver.findElement(By.name("logPassword")).sendKeys("test");

      //find login button and click it
      await (await driver.findElement(By.name("login"))).click();
    };

    let getWelcomeMsg = async (driver) => {
      //wait for welcome message on dashboard to confirm log in
      await driver.wait(until.elementLocated(By.css("h2.welcoming")), 10000);
      //making sure welcome message is addressing user that logged in
      let text = await (await driver.findElement(By.css("h2"))).getText();
      assert(text, "Welcome, test");
    };
  },

  regNewUser: async function () {
    describe("Register New User", () => {
      it("should register a new user to the app, and bring user to dashboard/homescreen where they see a welcome message", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          // try to log in and act as a registering user
          await driver.get("http://localhost:3000/");

          submitForm(driver);

          getWelcomeMsg(driver);
        } finally {
          await driver.quit();
        }
      });
    });

    let submitForm = async (driver) => {
      let date = new Date();
      let time = date.getTime();
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
    };

    let getWelcomeMsg = async (driver) => {
      //wait for the submit button pusb to register and grab the welcome message that matches the new registered user, confirming that user registration has been successful
      await driver.wait(until.elementLocated(By.css("h2.welcoming")), 10000);
      let text = await (await driver.findElement(By.css("h2"))).getText();
      assert(text, "Welcome, newUsername" + date);
    };
  },
};
