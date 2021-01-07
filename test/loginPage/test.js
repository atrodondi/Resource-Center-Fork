const { Builder } = require("selenium-webdriver");
const functions = require("./functions");

module.exports = {
  // test to make sure a user can login to an existing account then log out and land on login page
  userLogin: function () {
    describe("Existing User login", () => {
      it("should log user in using existing user account and land existing user on home page/dashboard. then log user out", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          await driver.get("http://localhost:3000/");
          // submitting login form
          await functions.submitLoginForm(driver);

          //   getting welcome message after sucessful login
          await functions.confirmLogin(driver);

          // log user out
          await functions.logOut(driver);
        } finally {
          await driver.quit();
        }
      });
    });
  },

  regNewUser: function () {
    describe("Register New User", () => {
      it("should register a new user to the app, and bring user to dashboard/homescreen where they see a welcome message", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          //passing in time to ensure different user names, emails, passwords for each test so no duplicate issues
          let date = new Date();
          let time = date.getTime();
          // try to log in and act as a registering user
          await driver.get("http://localhost:3000/");
          // submitting registration form
          await functions.submitRegForm(driver, time);

          //confirming successful registration
          await functions.confirmReg(driver, time);
        } finally {
          await driver.quit();
        }
      });
    });
  }
};
