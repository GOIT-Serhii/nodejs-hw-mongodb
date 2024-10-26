import ContactCollection from '../db/models/Contacts.js';

export const getContacts = () => ContactCollection();

export const getContactById = (id) => ContactCollection.findById(id);
