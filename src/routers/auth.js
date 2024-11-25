import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  authRegisterSchema,
  authLoginSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(authControllers.resetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authControllers.resetPwdController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.logingController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(authControllers.refreshSessionController),
);

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

export default authRouter;
