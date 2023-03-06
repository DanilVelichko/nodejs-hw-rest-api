const Joi = require("joi");

const saveContact = async (res, Contact, body) => {
  const contact = new Contact(body);

  await contact.save();
  res.status(201).json(contact);
};

const updateContact = async (req, res, Contact) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
  console.log(updatedContact)
  res.status(200).json(updatedContact);
};

const checkFields = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Missing fields to update, please check your input" });
  }
};

const validateContact = (req, res, next) => {
  const contactPostSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  const { error } = contactPostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const updateStatusContact =  (contact) => {
  let { favorite } = contact;
  favorite === false
    ? (favorite = true)
    : (favorite = false);
  contact.save();
};

module.exports = {
  updateStatusContact,
  saveContact,
  updateContact,
  checkFields,
  validateContact,
};
