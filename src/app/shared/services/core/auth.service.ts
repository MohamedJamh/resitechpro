import {Injectable, SkipSelf} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EnvService} from "./env.service";
import {Response} from "../../models/response.model";
import {Observable} from "rxjs";
import {Auth} from "../../models/iauth.model";
import {User} from "../../models/iuser.model";
import {CryptoService} from "./crypto.service";
import {Router} from "@angular/router";
import {TenantResolver} from "../../utils/tenant.resolver";


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
    private tenantService: TenantResolver
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
      refreshToken: localStorage.getItem('_resreftoken')
    },
{observe: 'response'}
    );
  }

  signOut(): void {
    localStorage.removeItem('_tntid');
    localStorage.removeItem('_resuser');
    localStorage.removeItem('_resacctoken');
    localStorage.removeItem('_resreftoken');
    this._router.navigate(['/authentication/login'])
  }
  setCurrentUser(authUser: Auth): void {
    const signedInUser = authUser.user!;
    const encryptedUser : string = this.cryptoService.encrypt(JSON.stringify(signedInUser));
    localStorage.setItem('_tntid',this.cryptoService.encrypt(this.tenantService.resolveFromEmail(signedInUser.email!)))
    localStorage.setItem('_resuser', encryptedUser);
    localStorage.setItem('_resacctoken', authUser.accessToken!);
    localStorage.setItem('_resreftoken', authUser.refreshToken!);
  }

  isLogged(): boolean {
    const user = localStorage.getItem('_resuser');
    const tenantId = localStorage.getItem('_tntid');
    if( !user || !tenantId ) return false;
    try {
      const decryptUser : User = JSON.parse(this.cryptoService.decrypt(user)) as User;
      const decryptedTenantId : string = this.cryptoService.decrypt(tenantId) as string;
      return true;
    }catch (e) {
      this.signOut();
      return false;
    }
  }

  getAuthenticatedUser(): User {
    const user = localStorage.getItem('_resuser');
    if( user ) {
      try {
        return JSON.parse(this.cryptoService.decrypt(user)) as User;
      }catch (e) {
        this.signOut();
      }
    }else this.signOut();
  }

}
