export class Response <T> {
    message : string ;
    result : T ;
    errors : any ;
    constructor(message : string, result : T, errors : any){
        this.message = message;
        this.result = result;
        this.errors = errors;
    }
}
