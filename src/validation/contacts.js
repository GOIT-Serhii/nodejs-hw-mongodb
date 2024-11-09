import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'any.required': `You need to add a name`,
    'string.min': `Name should have at least 3 characters`,
    'string.max': `Name should have no more than 20 characters`,
  }),
  phoneNumber: Joi.string().required().min(3).max(20).messages({
    'any.required': `You need to add a phone number`,
    'string.min': `Phone should have at least 3 characters`,
    'string.max': `Phone should have no more than 20 characters`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': `Please enter a valid email`,
    'string.min': `Email should have at least 3 characters`,
    'string.max': `Email should have no more than 20 characters`,
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .messages({
      'any.only': `Contact type should be one of ${typeList.join(', ')}`,
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': `Name should have at least 3 characters`,
    'string.max': `Name should have no more than 20 characters`,
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': `Phone should have at least 3 characters`,
    'string.max': `Phone should have no more than 20 characters`,
  }),
  email: Joi.string().email().min(3).max(20).messages({
    'string.email': `Please enter a valid email`,
    'string.min': `Email should have at least 3 characters`,
    'string.max': `Email should have no more than 20 characters`,
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .messages({
      'any.only': `Contact type should be one of ${typeList.join(', ')}`,
    }),
});
