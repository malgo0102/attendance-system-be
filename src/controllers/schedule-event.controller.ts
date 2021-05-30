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

export const getOne = async (req: Request, res: Response) => {
  const data = await scheduleEventService.getById(req.params.id);
  res.send(data);
};

export const updateScheduleEvent = async (req: Request, res: Response) => {
  const updatedScheduleEvent = req.body;
  const data = await scheduleEventService.update(
    req.params.id,
    updatedScheduleEvent,
  );
  res.send(data);
};

export const deleteById = async (req: Request, res: Response) => {
  await scheduleEventService.delete_(req.params.id);
  return res.json({
    data: { id: req.params.id },
  });
};
