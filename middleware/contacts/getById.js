const { Contact } = require("../../schemes/contacts/contact");


const getContactById = async (req, res, Contact) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact is not found" });
  }
  return contact;
};

const getALLbyId = async (req, res) => {
  try {

   await getContactById(req, res, Contact);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while Get ID");
  }
}

module.exports = getALLbyId;