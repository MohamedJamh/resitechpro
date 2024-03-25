import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/core/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private readonly _router: Router,
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.checkLogged() ;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogged()
  }

  private checkLogged() : boolean {
    if(this.authService.isLogged()){
      this._router.navigate(['/Home'])
      return false;
    }
    return true;
  }

}
