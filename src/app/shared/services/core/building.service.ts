import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../../models/response.model";
import {Building} from "../../models/ibuilding.model";

@Injectable({
  providedIn: 'root'
})
export class BuildingService{

  private readonly endpointPrefix : string = '/pms/buildings';

  constructor(
      private httpClient: HttpClient,
      private envService: EnvService,
  ){}

  getAllBuildings(){
    return this.httpClient.get<Response<Building[]>>(this.envService.apiUrl + this.endpointPrefix ,{observe : 'response'});
  }

  createBuilding(building: Building){
    return this.httpClient.post<Response<Building>>(this.envService.apiUrl + this.endpointPrefix , building, {observe: 'response'});
  }

  uploadImage(formData: FormData, buildingId: string){
    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data')
      .set('Accept', '*/*');
    return this.httpClient.post<Response<boolean>>(
      this.envService.apiUrl + this.endpointPrefix + "/" + buildingId + '/upload',
      formData,
      {
        observe: 'response',
        headers: headers
      });
  }
}
