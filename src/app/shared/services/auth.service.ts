import {Injectable, SkipSelf} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../models/response.model";
import {Observable} from "rxjs";
import {Auth} from "../models/iauth.model";
import {User} from "../models/iuser.model";
import {CryptoService} from "./crypto.service";
import {Router} from "@angular/router";
import {TenantService} from "./tenant.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpointPrefix : string = '/auth';
  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
    private cryptoService: CryptoService,
    private readonly _router: Router,
    private tenantService: TenantService
  ) {}
  signIn(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
    let httpHeaders = new HttpHeaders()
        .set('X-tenant-id',this.tenantService.resolveFromEmail(userCredentials.email!) );
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/sign-in', userCredentials,
      {
        observe: 'response',
        headers: httpHeaders
      }
    );
  }

  signUp(userCredentials: User): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/sign-up', userCredentials,
      {
        observe: 'response'
      }
    );
  }

  refreshToken(): Observable<HttpResponse<Response<Auth>>> {
    return this.httpClient.post<Response<Auth>>(this.envService.apiUrl + this.endpointPrefix + '/refresh-token',
{
      refreshToken: localStorage.getItem('aftasreftoken')
    },
{observe: 'response'}
    );
  }

  signOut(): void {
    localStorage.removeItem('aftasuser');
    localStorage.removeItem('aftasacctoken');
    localStorage.removeItem('aftasreftoken');
    this._router.navigate(['/auth'])
      .then(() => {
        alert('session Timeout')
      });
  }

  isLogged(): boolean {
    const user = localStorage.getItem('aftasuser');
    if( user ) {
      try {
        const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
        return true;
      }catch (e) {
        this.signOut();
        return false;
      }
    }
    return false;
  }

}
