import {View} from "./view.typs";

export interface IStats {
  totalProperties: number;
  totalBuildings: number;
  totalResidences: number;
  totalViews: number;
  views: View[]
}

export class Stats implements IStats {
  constructor(public totalProperties: number,
              public totalBuildings: number,
              public totalResidences: number,
              public totalViews: number,
              public views: View[]
  ){}
}
