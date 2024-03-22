import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../../models/response.model";
import {Building} from "../../models/ibuilding.model";
import {Property} from "../../models/iproerpty.model";

@Injectable({
  providedIn: 'root'
})
export class PropertyService{

  private readonly endpointPrefix : string = '/pms/properties';

  constructor(
      private httpClient: HttpClient,
      private envService: EnvService,
  ){}

  getAllProperties(){
    return this.httpClient.get<Response<Property[]>>(this.envService.apiUrl + this.endpointPrefix ,{observe : 'response'});
  }

  createProperty(property: Property){
    return this.httpClient.post<Response<Property>>(this.envService.apiUrl + this.endpointPrefix , property, {observe: 'response'});
  }

  uploadImage(formData: FormData, propertyId: string){
    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data')
      .set('Accept', '*/*');
    return this.httpClient.post<Response<boolean>>(
      this.envService.apiUrl + this.endpointPrefix + "/" + propertyId + '/upload',
      formData,
      {
        observe: 'response',
        headers: headers
      });
  }
}
