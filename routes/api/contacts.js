const express = require("express");
const {
contacts: ctrl,
} = require("../../middleware/index.js");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getALLbyId);

router.post("/", ctrl.validateContact, ctrl.saveAllContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateAllContact);

router.patch("/:contactId/favorite", ctrl.updateFavoriteStatus);

module.exports = router;
