import {User} from "./iuser.model";

export interface IAuth {
  accessToken?: string;
  refreshToken? : string;
  user? : User;
}
export class Auth implements IAuth {
  constructor(public accessToken?: string,
              public refreshToken? : string,
              public user? : User
  ){}
}
