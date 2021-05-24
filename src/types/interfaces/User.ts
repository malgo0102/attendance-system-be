interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  classId: number;
}

type Role = 'Admin' | 'Teacher' | 'Student';
