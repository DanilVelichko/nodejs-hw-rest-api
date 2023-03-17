const express = require("express");
const { contacts: ctrl } = require("../../middleware/index.js");
const { authenticateToken } = require("../../helpers/index.js");

const router = express.Router();

router.get("/", authenticateToken, ctrl.getAllContacts);

router.get("/:contactId", authenticateToken, ctrl.getALLbyId);

router.post("/", authenticateToken, ctrl.validateContact, ctrl.saveAllContact);

router.delete("/:contactId", authenticateToken, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticateToken,
  ctrl.validateContact,
  ctrl.updateAllContact
);

router.patch(
  "/:contactId/favorite",
  authenticateToken,
  ctrl.validateContact,
  ctrl.updateFavoriteStatus
);

module.exports = router;
