import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Response} from "../../models/response.model";
import {Auth} from "../../models/iauth.model";
import {EnvService} from "./env.service";

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private readonly endpointPrefix : string = '/tenants';
  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) { }
  checkTenant(tenantId: string): Observable<HttpResponse<Response<boolean>>>{
    tenantId = tenantId.replace(/[\s\W_]/g, '');
    return this.httpClient.get<Response<boolean>>(this.envService.apiUrl + this.endpointPrefix + '/check-tenant/' + tenantId,{observe: 'response'});
  }
}
