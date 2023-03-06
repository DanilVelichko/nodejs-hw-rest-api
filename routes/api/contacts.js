const express = require("express");
const { Contact } = require("../api/schems"); // add Schema
const {
  updateStatusContact,
  saveContact,
  updateContact,
  checkFields,
  validateContact,
} = require("../../models/contactsFunctions");

const router = express.Router();

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({}); // read db.contacts
    res.status(200).json(contacts); // return contacts list
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Get contact by ID
router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId); // find contact by id
    if (contact) {
      res.status(200).json(contact); // return contact by id
    } else {
      res.status(404).json({ message: "Contact is not found" }); // return 404 error if contact not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while Get ID");
  }
});

// Update status contact
router.post("/", validateContact, async (req, res) => {
  try {
    saveContact(res, Contact, req.body);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//  Delete contact
router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);  // delete contact from db
   
    res.status(200).json({ message: "Contact deleted" }); 
  } catch (error) {
    res.status(404).json({ message: "Contact for delete is not found" });
  }
});

// Update contact
router.put("/:contactId", async (req, res) => {
  try {
   await checkFields(req, res);

   await updateContact(req, res, Contact);
    
  } catch (error) {
    if (error.message === "Contact not found") {
      return res
        .status(404)
        .json({ message: "Contact for update is not found" });
    }
    res.status(500).json({ message: error.message });
  }
});


// Update contact favourite status
router.patch("/:contactId/favorite", async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    // Check if favorite field exists
    if (!req.body || typeof favorite !== "boolean") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    // Check if contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Update the favorite status of the contact
    updateStatusContact(contact);

    return res
      .status(200)
      .json({ message: "Favorite status updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
