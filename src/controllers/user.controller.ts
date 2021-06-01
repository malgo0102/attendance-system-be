'use strict';

import { Response, Request } from 'express';
import * as userService from '../services/user.service';
import { TEST_MODE } from '../util/secrets';
import { testUser } from '../util/test-user';

export const me = async (req: Request, res: Response) => {
  if (TEST_MODE) {
    res.send(testUser);
  }
  const ip = req.headers['x-forwarded-for'];
  console.log('Ip:', ip);
  console.log('IP:', req.connection.remoteAddress);
  const user = await userService.getUserById(req.user?.sub ?? '');
  res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const createdUser = await userService.createUser(req.body);
  res.send(createdUser);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const listParameters = req.queryListParams;
  const { pagination, data } = await userService.getAllUsers(listParameters);
  res.header(
    'Content-Range',
    `users ${pagination.start}-${pagination.end}/${pagination.total}`,
  );
  res.send(data);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const updatedUser = req.body;
  const data = await userService.updateUser(req.params.userId, updatedUser);
  res.send(data);
};

export const deleteUserById = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId);
  return res.json({
    data: { id: req.params.userId },
  });
};
