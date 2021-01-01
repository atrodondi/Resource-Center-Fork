const loginPageTests = require("./loginPageTests");

// test to make sure a new user can register
loginPageTests.regNewUser();

// testing to make sure existing user can log in
loginPageTests.userLogin();
