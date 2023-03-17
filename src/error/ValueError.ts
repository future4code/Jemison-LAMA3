import { BaseError } from "./BaseError";

export class ValueError extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}
