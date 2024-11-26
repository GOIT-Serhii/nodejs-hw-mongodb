import * as contactsServices from '../services/contacts.js';
import * as path from 'node:path';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contacts.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const enableCloudinary = env('ENABLE_CLOUDINARY');

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await contactsServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully find contacts',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id: _id } = req.params;
  const filter = parseContactFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;
  const data = await contactsServices.getContactById({ _id, filter });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  let photo = null;
  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      await saveFileToUploadDir(req.file);
      photo = path.join(req.file.filename);
    }
  }

  const data = await contactsServices.addContact({
    ...req.body,
    photo,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const result = await contactsServices.updateContact({
    _id,
    userId,
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

export const deleteContactController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await contactsServices.deleteContact({ _id, userId });

  if (!data) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send({ message: 'Contact deleted successfully' });
};
