import * as contactsServices from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const data = await contactsServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully find contacts',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await contactsServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactsServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await contactsServices.updateContact({
    _id,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;

  const data = await contactsServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
