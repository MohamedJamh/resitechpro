import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TenantResolver{
  private constructor() {
  }
  public static resolveTenant(email?: string): string {
    if (!email) return 'public';
    let domain = email.split('@')[1];
    return  domain.split('.')[0];
  }
}

