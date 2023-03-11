const { Contact } = require("../../schemes/contacts/contactSchema");


const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Contact for delete is not found" });
  }
}

module.exports = deleteContact;
