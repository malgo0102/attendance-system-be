'use strict';

import { Response, Request } from 'express';
import * as scheduleEventService from '../services/schedule-event.service';

export const createScheduleEvent = async (req: Request, res: Response) => {
  const newEvents = await scheduleEventService.create(req.body);
  res.status(201).send(newEvents);
};

export const getAll = async (req: Request, res: Response) => {
  const listParameters = req.queryListParams;
  const { data, pagination } = await scheduleEventService.getAll(
    listParameters,
  );
  if (pagination) {
    res.header(
      'Content-Range',
      `users ${pagination.start}-${pagination.end}/${pagination.total}`,
    );
  }
  res.send(data);
};
