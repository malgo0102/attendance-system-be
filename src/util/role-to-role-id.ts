import { userRoleIds } from './secrets';
import { Role } from '../types/interfaces/User';

export function roleToRoleId(role: Role) {
  switch (role) {
    case 'Admin':
      return userRoleIds.admin;
    case 'Teacher':
      return userRoleIds.teacher;
    case 'Student':
      return userRoleIds.student;
    default:
      return userRoleIds.student;
  }
}
