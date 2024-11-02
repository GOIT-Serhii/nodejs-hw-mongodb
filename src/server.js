import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import contactsRouter from './routers/contacts.js';

import { notFoundHandler } from './midlewares/notFoundHandler.js';
import { errorHandler } from './midlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // app.use(logg);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3001));

  app.listen(port, () => console.log(`Server is running on ${port} port `));
};
