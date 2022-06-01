import { IUser } from '../../interfaces/user';

const usersMockPublic = [
  {
    id: 1,
    username: 'user123',
    role: 'user',
    email: 'user1@email.com',
  },
  { id: 2,
    username: 'user456',
    role: 'user',
    email: 'user2@email.com',
  },
  { id: 3,
    username: 'admin123',
    role: 'admin',
    email: 'admin@email.com',
  },
];

const usersMock: IUser[] = [
  {
    ...usersMockPublic[0],
    password: '$2a$10$lJ5Ssw1jXkzBeGlLvdDD/ef/9XJiShQk0klGppf5bIshdvPFL31Hu',
  },
  {
    ...usersMockPublic[1],
    password: '$2a$10$9eRTynJm2yyILhtLIbNe9ulFNoUqbMIBzFjhMn2FgujH.24SShmva',
  },
  {
    ...usersMockPublic[2],
    password: '$2a$10$nUqVP4.isLYchPUj3ko0HONUifxOHzX/NrGZnI//u3XI5IGPWtG4u',
  },
];

const usersPassword = ['secret_user123', 'secret_user456', 'secret_admin123'];

const userOutOfDb = {
  id: 5500,
  username: 'useroutofdb',
  role: 'someotherthing',
  email: 'user.out.of.db@email.com',
};

export {
  usersMockPublic,
  usersMock,
  usersPassword,
  userOutOfDb,
};
