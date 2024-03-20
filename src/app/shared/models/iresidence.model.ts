import {Image} from "./iimage.model";
import {User} from "./iuser.model";

export interface IResidenceModel {
     id? : string;
     label?: string;
     description? : string;
     location?: string;
     surface?: number;
     longitude?: number;
     latitude?: number;
     images?: Image[];
     owner?: User
}

export class Residence implements IResidenceModel {
     constructor(
          public id?: string,
          public label? : string,
          public description? : string,
          public location?: string,
          public surface?: number,
          public longitude?: number,
          public latitude?: number,
          public images?: Image[],
          public owner?: User
     ){}
}

