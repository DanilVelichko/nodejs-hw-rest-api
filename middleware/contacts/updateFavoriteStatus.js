const { Contact } = require("../../schemes/contacts/contact");

const updateFavoriteStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
      checkBodyFavorite(req, res);

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await updateStatusContact(contact);
 
    return res
      .status(200)
      .json({ message: "Favorite status updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateStatusContact = async (contact) => {
  contact.favorite === false
    ? (contact.favorite = true)
    : (contact.favorite = false);
  contact.save();
};

const checkBodyFavorite = async (req, res) => {
  const { favorite } = req.body;

    if (!req.body || typeof favorite !== "boolean") {
      return res.status(400).json({ message: "missing field favorite" });
  }
};

module.exports = updateFavoriteStatus;