import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../../models/response.model";
import {Residence} from "../../models/iresidence.model";

@Injectable({
  providedIn: 'root'
})
export class ResidenceService{

  private readonly endpointPrefix : string = '/pms/residences';

  constructor(
      private httpClient: HttpClient,
      private envService: EnvService,
  ){}

  getAllResidences(){
    return this.httpClient.get<Response<Residence[]>>(this.envService.apiUrl + this.endpointPrefix ,{observe : 'response'});
  }

  createResidence(residence: Residence){
    return this.httpClient.post<Response<Residence>>(this.envService.apiUrl + this.endpointPrefix , residence, {observe: 'response'});
  }

  uploadImage(formData: FormData, residenceId: string){
    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data')
      .set('Accept', '*/*');
    return this.httpClient.post<Response<boolean>>(
      this.envService.apiUrl + this.endpointPrefix + "/" + residenceId + '/upload',
      formData,
      {
        observe: 'response',
        headers: headers
      });
  }
}
