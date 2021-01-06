const { Builder } = require("selenium-webdriver");
const functions = require("./functions");
const loginPageFunctions = require("../loginPage/functions");

module.exports = {
  // test to see if user can login and create a new resource card
  addNewResource: function () {
    describe("Creating new resource", () => {
      it("should log in existing user and fill out new resource form and add new resource to DB,confirm new resource was made, then log user out", async () => {
        let driver = await new Builder().forBrowser("chrome").build();

        try {
          await driver.get("http://localhost:3000/");
          //   loggin user in before adding new resource
          await loginPageFunctions.submitLoginForm(driver);
          // confirming successful login

          // adding new resource
          await functions.addNewResource(driver);

          //   logging user out after adding new resource
          await loginPageFunctions.logOut(driver);
        } finally {
          await driver.quit();
        }
      });
    });
  }
};
