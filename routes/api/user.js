const express = require("express");
const { users: usr } = require("../../middleware/index.js");
const helpers = require("../../helpers/index.js");

const router = express.Router();

router.post("/register", usr.validateUser, usr.registerUser);
router.get("/login", usr.validateUser, usr.loginUser);
router.get("/current", helpers.authenticateToken, usr.getCurrentUser);
router.post("/logout", helpers.authenticateToken, usr.logout);
router.patch("/", helpers.authenticateToken, usr.updateUser);
router.patch(
  "/avatars",
  helpers.authenticateToken,
  usr.upload.single("avatar"),
  usr.updateAvatar
);

module.exports = router;
