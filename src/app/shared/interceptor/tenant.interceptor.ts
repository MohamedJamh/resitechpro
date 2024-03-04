import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TenantService} from "../services/tenant.service";

@Injectable(
    {providedIn: 'root'}
)
export class TenantInterceptor implements HttpInterceptor {
  constructor(private tenantService : TenantService) {}
  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    debugger
    if( ! request.url.includes('sign-up' || 'check-tenant')){
      let tenantId : string = '';
      if(request.url.includes('sign-in')) tenantId = this.tenantService.resolveFromEmail(request.body.email);
      else tenantId = this.tenantService.resolveFromLocalStorage();

      request = request.clone({
        headers: request.headers.set('X-tenant-id', tenantId)
      });
    }
    return next.handle(request);
  }
}
