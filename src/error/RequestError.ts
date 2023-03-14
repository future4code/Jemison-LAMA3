import { BaseError } from "./BaseError";

export class RequestError extends BaseError {
    constructor(message: string) {
        super(message, 401);
    }
}