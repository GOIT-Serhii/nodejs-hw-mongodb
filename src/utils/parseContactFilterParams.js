import { typeList } from '../constants/contacts.js';

const favouriteList = ['true', 'false'];

const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => typeList.includes(type);

  if (isType(type)) return type;
};

const parseFavourite = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;
  const isFavourite = (value) => favouriteList.includes(value);

  if (isFavourite(value)) return value;
};

export const parseContactFilterParams = (query) => {
  const { favourite, type } = query;

  const parsedFavouriteValue = parseFavourite(favourite);
  const parsedType = parseType(type);

  return {
    favourite: parsedFavouriteValue,
    type: parsedType,
  };
};
