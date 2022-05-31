import { readFileSync } from 'fs';
import { SignOptions } from 'jsonwebtoken';
import JWTUser from './JWTUser';

const secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });
const options: SignOptions = { algorithm: 'HS256', expiresIn: '7d' };

export default new JWTUser(secret, options);
