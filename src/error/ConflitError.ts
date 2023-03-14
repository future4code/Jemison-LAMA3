import { BaseError } from "./BaseError";

export class ConflitError extends BaseError{
    constructor(message:string){
        super(message, 409)
    }
}