const { expect } = require("chai");
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
    //wait for the submit button pusb to register and grab the welcome message that matches the new registered user, confirming that user registration has been successful
    await driver.wait(until.elementLocated(By.className("welcoming")), 10000);
    let text = await await driver
      .findElement(By.className("welcoming"))
      .getText();
    expect(text).to.equal("Welcome, newUsername" + time + ".");
  },
  //   getting welcome message after sucessful login ensuring user has logged in sucessfully
  confirmLogin: async driver => {
    //wait for welcome message on dashboard to confirm log in
    await driver.wait(until.elementLocated(By.className("welcoming")), 10000);
    //making sure welcome message is addressing user that logged in
    let text = await driver.findElement(By.className("welcoming")).getText();
    // test is the username in this case
    expect(text).to.equal("Welcome, test.");
  },

  //log user out
  logOut: async driver => {
    await driver.wait(until.elementLocated(By.name("logoutBtn")), 10000);
    // click logout button to log out
    await driver.findElement(By.name("logoutBtn")).click();
    await driver.wait(until.elementLocated(By.css("div.card-header")), 5000);
    let text = await driver.findElement(By.css("div.card-header")).getText();
    expect(text).to.equal("Login");
  }
};
