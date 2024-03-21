import {Image} from "./iimage.model";
import {Residence} from "./iresidence.model";

export interface IBuildingModel {
     id? : string;
     label?: string;
     description? : string;
     numberFloors?: number;
     residenceLabel?: string;
     residence?: Residence;
     images?: Image[];
}

export class Building implements IBuildingModel {
     constructor(
          public id?: string,
          public label? : string,
          public description? : string,
          public numberFloors?: number,
          public residenceLabel?: string,
          public residence?: Residence,
          public images?: Image[],
     ){}
}

