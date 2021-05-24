/* eslint-disable @typescript-eslint/camelcase */
import { auth0ManagementClient } from './auth0-managament.service';
import { generate } from 'generate-password';
import { QueryListParams } from '../types/interfaces/QueryListParams';
import { UserData } from 'auth0';
import { userdataToUser } from '../util/userdata-to-user';
import { roleToRoleId } from '../util/role-to-role-id';
import ClassModel from '../models/Class';
import APIError from '../errors/api-error';

export async function createUser(user: User) {
  const class_ = await ClassModel.query().findById(user.classId);
  if (!class_) {
    throw APIError.ResourceNotFound('Class', user.classId);
  }
  const newUser = await auth0ManagementClient.createUser({
    email: user.email,
    email_verified: false,
    password: generate({
      length: 12,
      numbers: true,
      symbols: true,
    }),
    connection: 'Username-Password-Authentication',
    app_metadata: {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      classId: class_.id,
    },
    user_metadata: {},
  });
  const mappedUser = userdataToUser(newUser);
  await auth0ManagementClient.assignRolestoUser(
    { id: mappedUser.id },
    { roles: [roleToRoleId(user.role)] },
  );

  // This ticket contains a link to reset password, that the user should receive account creation
  const { ticket } = await auth0ManagementClient.createPasswordChangeTicket({
    user_id: newUser.user_id,
    ttl_sec: 60 * 60 * 24 * 7,

    mark_email_as_verified: true,
  });

  //TODO AP 24.05.2021: Send password reset ticket via email
  return mappedUser;
}

export async function getAllUsers(listParameters?: QueryListParams) {
  let params = {};
  // TODO AP  24.05.2021: Sort by firstname and lastname
  let isMetadataSortProperty;
  if (listParameters) {
    const perPage = listParameters.range
      ? listParameters.range[1] - listParameters.range[0] + 1
      : undefined;
    isMetadataSortProperty = !(
      listParameters.sort && listParameters.sort[0] === 'email'
    );
    params = {
      per_page: perPage,
      page:
        listParameters.range && perPage
          ? listParameters.range[0] / perPage
          : undefined,
      sort:
        listParameters.sort && !isMetadataSortProperty
          ? `${listParameters.sort[0]}:${
              listParameters.sort[1] === 'DESC' ? -1 : 1
            }`
          : undefined,
      include_totals: true,
    };
  }
  const response = ((await auth0ManagementClient.getUsers(
    params,
  )) as unknown) as {
    start: number;
    limit: number;
    length: number;
    total: number;
    users: UserData[];
  };
  return {
    data: response.users.map(u => userdataToUser(u)),
    pagination: {
      total: response.total,
      start: response.start,
      end: response.start + response.length,
    },
  };
}

export async function getUserById(userId: string) {
  const userData = await auth0ManagementClient.getUser({ id: userId });
  return userdataToUser(userData);
}

export async function updateUser(userId: string, updatedUser: User) {
  const class_ = await ClassModel.query().findById(updatedUser.classId);
  if (!class_) {
    throw APIError.ResourceNotFound('Class', updatedUser.classId);
  }
  const userData = await auth0ManagementClient.updateUser(
    { id: userId },
    {
      email: updatedUser.email,
      app_metadata: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        classId: class_.id,
      },
    },
  );
  await auth0ManagementClient.removeRolesFromUser(
    { id: userId },
    {
      roles: [
        roleToRoleId('Admin'),
        roleToRoleId('Teacher'),
        roleToRoleId('Student'),
      ],
    },
  );
  await auth0ManagementClient.assignRolestoUser(
    { id: userId },
    { roles: [roleToRoleId(updatedUser.role)] },
  );

  return userdataToUser(userData);
}

export async function deleteUserById(userId: string) {
  return await auth0ManagementClient.deleteUser({ id: userId });
}
