const { Contact } = require("../../schemes/contacts/contactSchema");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    const filter = { owner: _id };
    if (favorite !== undefined) {
      filter.favorite = favorite === 'true';
    }
    const contacts = await Contact.find(filter, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = getAllContacts;
