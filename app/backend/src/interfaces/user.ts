import { JwtPayload } from 'jsonwebtoken';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserPublic {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface IUserDecoded extends JwtPayload {
  data: IUserPublic;
}

export interface IUserLogged {
  user: IUserPublic;
  token: string;
}

export interface IUser extends IUserCredentials, IUserPublic {}
