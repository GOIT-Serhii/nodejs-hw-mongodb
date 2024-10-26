import ContactCollection from '../db/models/Contacts';

export const getContacts = () => ContactCollection();

export const getContactById = (id) => ContactCollection.findById(id);
