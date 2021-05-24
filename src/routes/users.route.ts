import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import configureListParams from '../util/parse-list-params';
import * as userController from '../controllers/user.controller';
import * as userValidation from '../validation/user.validation';

const usersRouter = Router();

usersRouter.get('/me', checkJwt(), userController.me);

usersRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:user']),
  userValidation.createUser,
  wrap(userController.createUser),
);

usersRouter.get(
  '/',
  checkJwt(),
  checkPermissions(['read:user']),
  configureListParams,
  wrap(userController.getAllUsers),
);

usersRouter.get(
  '/:userId',
  checkJwt(),
  checkPermissions(['read:user']),
  wrap(userController.getUserById),
);

usersRouter.put(
  '/:userId',
  checkJwt(),
  checkPermissions(['update:user']),
  wrap(userController.updateUser),
);

usersRouter.delete(
  '/:userId',
  checkJwt(),
  checkPermissions(['delete:user']),
  wrap(userController.deleteUserById),
);

export default usersRouter;
