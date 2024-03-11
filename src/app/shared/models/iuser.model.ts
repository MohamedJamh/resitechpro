import {Role} from "./irole.model";

export interface IUser{
  id?: number;
  firstName? : string;
  lastName? : string;
  email? : string;
  personalEmail? : string;
  password? : string;
  organizationName? : string;
  organizationId? : string;
  phone? : string;
  place? : string;
  roles? : Role[];
}
export class User implements IUser {
  constructor(public id?: number,
              public firstName? : string,
              public lastName? : string,
              public email? : string,
              public personalEmail? : string,
              public password? : string,
              public organizationName? : string,
              public organizationId? : string,
              public phone? : string,
              public place? : string,
              public roles? : Role[]
  ){}

  setId(id: number): void {
    this.id = id;
  }
}
