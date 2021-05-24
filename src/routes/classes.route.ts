import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as classesController from '../controllers/classes.controller';
import * as classesValidation from '../validation/classes.validation';
import configureListParams from '../util/parse-list-params';

const classesRouter = Router();

classesRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:class']),
  classesValidation.createClass,
  wrap(classesController.createClass),
);

classesRouter.get(
  '/',
  checkJwt(),
  checkPermissions(['read:class']),
  configureListParams,
  wrap(classesController.getAllClasses),
);

classesRouter.get(
  '/:id',
  checkJwt(),
  checkPermissions(['read:class']),
  wrap(classesController.getClassById),
);

classesRouter.put(
  '/:id',
  checkJwt(),
  checkPermissions(['update:class']),
  classesValidation.updateClass,
  wrap(classesController.updateClass),
);

classesRouter.delete(
  '/:id',
  checkJwt(),
  checkPermissions(['delete:class']),
  wrap(classesController.deleteClassById),
);

export default classesRouter;
