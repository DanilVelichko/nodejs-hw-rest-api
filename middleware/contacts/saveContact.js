const { Contact } = require("../../schemes/contacts/contact");

const saveContact = async (res, Contact, body) => {
  const contact = new Contact(body);

  await contact.save();
  res.status(201).json(contact);
};

const saveAllContact = async (req, res) => {
  try {
    saveContact(res, Contact, req.body);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

module.exports = saveAllContact;