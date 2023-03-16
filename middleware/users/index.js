const registerUser = require("./registerUser.js");
const validateUser = require("./validateUser.js");
const loginUser = require("./loginUser.js");
const getCurrentUser = require("./getCurrentUser.js");
const logout = require("./logout.js");
const updateUser = require("./updateUser.js");
const updateAvatar = require("./updateAvatar.js");
const upload = require("./upload.js");

module.exports = {
    registerUser,
    validateUser,
    loginUser,
    getCurrentUser,
    logout,
    updateUser,
    updateAvatar,
    upload,
}