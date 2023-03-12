const registerUser = require("./registerUser.js");
const validateUser = require("./validateUser.js");
const loginUser = require("./loginUser.js");
const getCurrentUser = require("./getCurrentUser.js");
const logout = require("./logout.js");
const updateUser = require("./updateUser.js");

module.exports = {
    registerUser,
    validateUser,
    loginUser,
    getCurrentUser,
    logout,
    updateUser,
}