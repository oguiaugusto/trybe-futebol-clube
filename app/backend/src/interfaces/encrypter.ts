import { IUserDecoded, IUserPublic } from './user';

export interface IEncrypter {
  sign(user: IUserPublic): string;
  verify(userToken: string): IUserDecoded;
}
