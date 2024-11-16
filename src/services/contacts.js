import ContactCollection from '../db/models/Contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  let contactQuery = ContactCollection.find();

  if (filter.favourite !== undefined) {
    contactQuery = contactQuery.where('isFavourite').equals(filter.favourite);
  }
  if (filter.type) {
    contactQuery = contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.userId) {
    contactQuery = contactQuery.where('userId').equals(filter.userId);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData({
    totalItems: contactsCount,
    page,
    perPage,
  });

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContact = async (filter) => {
  return ContactCollection.findOneAndDelete(filter);
};
