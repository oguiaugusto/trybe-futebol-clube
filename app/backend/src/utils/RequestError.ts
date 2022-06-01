import { StatusCodes } from 'http-status-codes';
import Messages from '../schemas/Messages';

export default class RequestError extends Error {
  constructor(public status: StatusCodes, message: Messages) {
    super(message);

    this.status = status;
  }
}
