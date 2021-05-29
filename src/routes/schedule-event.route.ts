import { Router } from 'express';
import { wrap } from 'async-middleware';
import { checkJwt, checkPermissions } from '../util/authorize-route';
import * as scheduleEventController from '../controllers/schedule-event.controller';
import * as scheduleEventValidation from '../validation/schedule-event.validation';
import configureListParams from '../util/parse-list-params';

const scheduleEventRouter = Router();

scheduleEventRouter.post(
  '/',
  checkJwt(),
  checkPermissions(['create:schedule-event']),
  scheduleEventValidation.createEvent,
  wrap(scheduleEventController.createScheduleEvent),
);

scheduleEventRouter.get(
  '/',
  checkJwt(),
  checkPermissions(['read:schedule-event']),
  configureListParams,
  wrap(scheduleEventController.getAll),
);

export default scheduleEventRouter;
