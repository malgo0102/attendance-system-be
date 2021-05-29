import { UserData } from 'auth0';
import { User } from '../types/interfaces/User';

export function userdataToUser(userData: UserData): User {
  return {
    id: userData.user_id ?? '',
    email: userData.email ?? '',
    firstName: userData.app_metadata?.firstName,
    lastName: userData.app_metadata?.lastName,
    role: userData.app_metadata?.role,
    classId: userData.app_metadata?.classId,
  };
}
