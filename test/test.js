const loginPageTests = require("./loginPage/test");
const homePageTests = require("./homePage/test");

// test to make sure a new user can register
loginPageTests.regNewUser();

// testing to make sure existing user can log in
loginPageTests.userLogin();

// testing to make sure user can add new resource to DB
homePageTests.addNewResource();
