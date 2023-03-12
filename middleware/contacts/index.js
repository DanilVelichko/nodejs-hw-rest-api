const getAllContacts = require("./getAll.js");
const validateContact = require("./validateContact.js");
const saveAllContact = require("./saveContact.js");
const getALLbyId = require("./getById.js");
const updateFavoriteStatus = require("./updateFavoriteStatus.js");
const deleteContact = require("./deleteContact.js");
const updateAllContact = require("./updateContact.js");

module.exports = {
    getAllContacts,
    validateContact,
    saveAllContact,
    getALLbyId,
    updateFavoriteStatus,
    deleteContact,
    updateAllContact,
}