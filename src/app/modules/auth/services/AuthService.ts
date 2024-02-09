import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "../../../core/services/EnvService";
import {Response} from "../../../core/utils/Response";
import {Auth} from "../../../core/models/IAuth";
import {User} from "../../../core/models/IUser";
import {TenantResolver} from "../../../core/utils/TenantResolver";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpointPrefix = '/auth';
  constructor(private httpClient: HttpClient, private envService: EnvService,tenantResolver : TenantResolver) {}

  Signup(newUser: User): Observable<HttpResponse<Response<Auth>>> {
    console.log("new user added")
    console.log(newUser)
    return this.httpClient.post<HttpResponse<Response<Auth>>>(this.envService.apiUrl + this.endpointPrefix + '/signup', newUser, {observe: 'body'});
  }

  signin(userCredentails: User): Observable<HttpResponse<Response<Auth>>> {
    const tenantName : string  = TenantResolver.resolveTenant(userCredentails.email);
    const httpHeader : HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'organizationName' : tenantName
    });
    return this.httpClient.post<HttpResponse<Response<Auth>>>(this.envService.apiUrl + this.endpointPrefix + '/signin',
{
        email: userCredentails.email,
        password: userCredentails.password
      },
{observe: 'body',headers: httpHeader}
    );
  }

}
