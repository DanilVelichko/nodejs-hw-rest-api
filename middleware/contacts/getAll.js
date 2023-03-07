const { Contact } = require("../../schemes/contacts/contact");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

module.exports = getAllContacts;
