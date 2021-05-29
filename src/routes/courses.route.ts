import { Router } from 'express';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as coursesValidation from '../validation/courses.validation';
import { wrap } from 'async-middleware';
import * as coursesController from '../controllers/courses.controller';
import configureListParams from '../util/parse-list-params';

const coursesRouter = Router();

coursesRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:course']),
  coursesValidation.createCourse,
  wrap(coursesController.createCourse),
);

coursesRouter.get(
  '/',
  checkJwt(),
  checkPermissions(['read:course']),
  configureListParams,
  wrap(coursesController.getAllCourses),
);

coursesRouter.get(
  '/:id',
  checkJwt(),
  checkPermissions(['read:course']),
  wrap(coursesController.getCourseById),
);

coursesRouter.put(
  '/:id',
  checkJwt(),
  checkPermissions(['read:course']),
  coursesValidation.updateCourse,
  wrap(coursesController.getCourseById),
);

coursesRouter.delete(
  '/:id',
  checkJwt(),
  checkPermissions(['delete:course']),
  wrap(coursesController.deleteCourseById),
);

export default coursesRouter;
