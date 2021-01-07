const { expect } = require("chai");
const { DocumentProvider } = require("mongoose");
const { By, until } = require("selenium-webdriver");

module.exports = {
  // logging user in by submitting login form
  submitLoginForm: async driver => {
    // enter keys to username input field
    await driver.findElement(By.name("logUsername")).sendKeys("test");

    //enter keys to password input field
    await driver.findElement(By.name("logPassword")).sendKeys("test");

    //find login button and click it
    await (await driver.findElement(By.name("login"))).click();
  },

  //   registering a new user
  submitRegForm: async (driver, time) => {
    //click register button to open register form
    await (await driver.findElement(By.name("register"))).click();
    // sending keys to the new email input field
    await driver
      .findElement(By.name("regEmail"))
      .sendKeys("newUser" + time + "@gmail.com");
    // sending keys to the new username field
    await driver
      .findElement(By.name("regUsername"))
      .sendKeys("newUsername" + time);
    //sending keys to the new password field
    await driver
      .findElement(By.name("regPassword"))
      .sendKeys("password" + time);
    //hitting submit button to complete the form
    await (await driver.findElement(By.className("btn-primary"))).click();
  },

  //   confirming a new user successfully registered
  confirmReg: async (driver, time) => {
    console.log("CONFIRMING");
    //wait for the submit button pusb to register and grab the welcome message that matches the new registered user, confirming that user registration has been successful
    await driver.wait(until.elementLocated(By.className("polygon")), 5000);
    let welcomeMsg = await driver.findElement(By.name("welcomeMsg"));
    // waiting until the  new users name is visible in the welcome message
    await driver.wait(
      until.elementTextContains(welcomeMsg, "Welcome, newUsername" + time)
    );
    let text = await driver.findElement(By.name("welcomeMsg")).getText();
    console.log(text);
    // confirms that reg was successful, and that the api route is working to reg a user and sends back their info to the welcome message
    expect(text).to.equal("Welcome, newUsername" + time + ".");
  },
  //   getting welcome message after sucessful login ensuring user has logged in sucessfully
  confirmLogin: async driver => {
    console.log("CONFIRMING");
    //wait for welcome message on dashboard to confirm log in

    await driver.wait(until.elementLocated(By.className("polygon")), 5000);
    //making sure welcome message is addressing user that logged in
    let welcomeMsg = await driver.findElement(By.name("welcomeMsg"));
    // waiting until the  new users name is visible in the welcome message
    await driver.wait(until.elementTextContains(welcomeMsg, "Welcome, test."));
    let text = await driver.findElement(By.name("welcomeMsg")).getText();
    console.log(text);
    // test is the username in this case
    expect(text).to.equal("Welcome, test.");
  },

  //log user out
  logOut: async driver => {
    // click logout button to log out
    await (await driver.findElement(By.name("logoutBtn"))).click();
    await driver.wait(until.elementLocated(By.name("loginHeader")), 5000);
    let text = await driver.findElement(By.name("loginHeader")).getText();
    // confirms successful logout by confirming being on login page
    expect(text).to.equal("Login");
  }
};
