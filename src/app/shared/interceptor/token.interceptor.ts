import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthService} from "../services/core/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {Auth} from "../models/iauth.model";
import {Response} from "../models/response.model";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService : AuthService,
    private readonly _router: Router,
  ) {}
  private countError : number = 0
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('auth')) return next.handle(request)
    debugger
    let accessToken : string | null = localStorage.getItem("_resacctoken");
    let refToken : string | null = localStorage.getItem("_resreftoken");
    let user : string | null = localStorage.getItem("_resuser");

    if(
      (accessToken == null && refToken == null ) ||
      (user == null && ! request.url.includes('profile') )
    ) this.timeOutSession()

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } else this.handle401Error(request, next);

    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status === 400 && this.countError != 1){
          this.countError++;
          this.handle401Error(request, next);
        }
        else if(this.countError === 1) this.timeOutSession()
        else this.handleOtherError(err)
        throw err;
      })
    );

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    debugger
    this.authService.refreshToken().subscribe((response: HttpResponse<Response<Auth>>) => {
      if([200].includes(response.status) && response.body?.result){
        this.countError = 0;
        alert("Token refreshed")
        localStorage.setItem('_resacctoken', response.body?.result.accessToken!);
        this._router.navigate(['/dashboard/home']);
      }
    });
  }

  private timeOutSession(){
    this.authService.signOut();
  }

  private handleOtherError(err:HttpErrorResponse){
    let errorMessage : string = err.error.message + "\n";
    for (let error of err.error.errors) {
      errorMessage += error.message + "\n";
    }
    alert(errorMessage)
  }
}
