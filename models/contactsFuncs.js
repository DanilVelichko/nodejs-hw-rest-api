/* eslint-disable no-useless-catch */
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {

    const data = await fs.readFile(contactsPath, "utf-8"); // read file
    const contacts = JSON.parse(data); // parse data
    return contacts;
  } catch (error) { 
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
     const contacts = await listContacts();
    const contact = contacts.find(c => c.id === contactId.toString()); // find contact by id
    return contact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((item) => item.id !== contactId); // filter contacts
    if (contacts.length === newContacts.length) {
       throw new Error("Contact not found");
       
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts)); // write new array to file
     
    return newContacts;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = (contacts.length + 1).toString(); // generate id for new contact
    const newContact = { ...body, id: id }; 
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts)); // write new array to file
    console.log("New contact has been added!");
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts(); // get contacts
    const index = contacts.findIndex(c => c.id === contactId.toString()); // find index of contact
    if (index === -1) {
      throw new Error("Contact not found");
    }
    const updatedContact = { ...contacts[index], ...body, id: contactId }; // update contact
    const newContacts = [...contacts]; 
    newContacts[index] = updatedContact; // update contact in new array
    await fs.writeFile(contactsPath, JSON.stringify(newContacts)); // write new array to file
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
