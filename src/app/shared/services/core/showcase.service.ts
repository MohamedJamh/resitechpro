import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../../models/response.model";
import {Property} from "../../models/iproerpty.model";
import {User} from "../../models/iuser.model";

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService{

  private readonly endpointPrefix : string = '/showcase';

  constructor(
      private httpClient: HttpClient,
      private envService: EnvService,
  ){}

  getAllProperties(){
    return this.httpClient.get<Response<Property[]>>(this.envService.apiUrl + this.endpointPrefix + '/properties' ,{observe : 'response'});
  }

  getAllPartners(){
    return this.httpClient.get<Response<User[]>>(this.envService.apiUrl + this.endpointPrefix + '/' + 'users' , {observe: 'response'});
  }

  searchProperties(searchPaylod: object){
    return this.httpClient.post<Response<Property[]>>(this.envService.apiUrl + this.endpointPrefix + '/properties/search' , searchPaylod ,{observe : 'response'});
  }

}
