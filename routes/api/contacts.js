const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contactsFuncs");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts(); // get contacts list
    res.status(200).json(contacts); // return contacts list
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact); // return contact by id
    } else {
      res.status(404).json({ "message": "Contact is not found" }); // return 404 error if contact not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// create schema for validation
const contactPostSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
}); 

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactPostSchema.validate(req.body); // validate request body
    if (error) {
      return res.status(400).json({ "message": error.details[0].message }); // return 400 error if validation failed
    }
    const contact = { ...req.body };
    await addContact(contact); // save contact to file
    res.status(201).json(contact); // return saved contact with id
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId); // delete contact from file
    res.status(200).json({ "message": "Contact deleted" }); // return success message
  } catch (error) {
    res.status(404).json({ "message": "Contact for delete is not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      // check if all fields are present
      return res.status(400).json({ "message": "Missing fields to update, please check your input" });
    }
    const updatedContact = await updateContact(contactId, { name, email, phone }); // update contact
    res.status(200).json(updatedContact); // return updated contact
  } catch (error) {
    if (error.message === "Contact not found") {
      return res.status(404).json({ "message": "Contact for update is not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
