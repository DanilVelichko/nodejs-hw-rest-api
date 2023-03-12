const { Contact } = require("../../schemes/contacts/contactSchema");

const saveContact = async (req, res, Contact, body) => {
  const { _id } = req.user;

  const contact = new Contact({...req.body, owner: _id});

  await contact.save();
  res.status(201).json(contact);
};

const saveAllContact = async (req, res) => {
  try {
    saveContact(req, res, Contact);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

module.exports = saveAllContact;