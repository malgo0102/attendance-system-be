import { Router } from 'express';
import { checkJwt, checkPermissions } from '../util/authorizeRoute';
import * as userController from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.get(
  '/me',
  checkJwt,
  checkPermissions(['write:test']),
  userController.me,
);

export default usersRouter;
