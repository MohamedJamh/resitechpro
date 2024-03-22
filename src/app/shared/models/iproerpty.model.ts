import {Image} from "./iimage.model";
import {PropertyTypeEnum} from "../enums/property-type.enum";
import {Building} from "./ibuilding.model";

export interface IPropertyModel {
      id? : string;
      label?: string;
      description? : string;
      propertyType?: PropertyTypeEnum;
      surface?: number;
      numberRooms?: number;
      numberBathrooms?: number;
      numberBedrooms?: number;
      numberWindows?: number;
      floorNumber?: number;
      rentValue?: string;
      buildingLabel?: string;
      building?: Building;
      images?: Image[];
}

export class Property implements IPropertyModel {
     constructor(
          public id?: string,
          public label? : string,
          public description? : string,
          public propertyType?: PropertyTypeEnum,
          public surface?: number,
          public numberRooms?: number,
          public numberBathrooms?: number,
          public numberBedrooms?: number,
          public numberWindows?: number,
          public floorNumber?: number,
          public rentValue?: string,
          public buildingLabel?: string,
          public building?: Building,
          public images?: Image[],
     ){}
}

