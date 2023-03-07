const { Contact } = require("../../schemes/contacts/contact");

const updateContact = async (req, res, Contact) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

const updateAllContact = async (req, res) => {
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
};

const checkFields = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Missing fields to update, please check your input" });
  }
};

module.exports = updateAllContact;
