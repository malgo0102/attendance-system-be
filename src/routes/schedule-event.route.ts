import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as scheduleEventController from '../controllers/schedule-event.controller';
import * as scheduleEventValidation from '../validation/schedule-event.validation';
import configureListParams from '../util/parse-list-params';

const scheduleEventRouter = Router();

scheduleEventRouter.get(
  '/',
  checkJwt(),
  checkPermissions(['read:schedule-event']),
  configureListParams,
  wrap(scheduleEventController.getAll),
);

scheduleEventRouter.get(
  '/:id',
  checkJwt(),
  checkPermissions(['read:schedule-event']),
  wrap(scheduleEventController.getOne),
);

scheduleEventRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:schedule-event']),
  scheduleEventValidation.createEvent,
  wrap(scheduleEventController.createScheduleEvent),
);

scheduleEventRouter.put(
  '/:id',
  checkJwt(),
  checkPermissions(['update:schedule-event']),
  scheduleEventValidation.updateEvent,
  wrap(scheduleEventController.updateScheduleEvent),
);

scheduleEventRouter.delete(
  '/:id',
  checkJwt(),
  checkPermissions(['delete:schedule-event']),
  wrap(scheduleEventController.deleteById),
);

export default scheduleEventRouter;
