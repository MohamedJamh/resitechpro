import {Injectable} from "@angular/core";
import {CryptoService} from "../services/core/crypto.service";
import {AuthService} from "../services/core/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TenantResolver {
  private constructor(private cryptoService: CryptoService,
                      ) {}
  public resolveFromEmail(email: string): string {
    let domain = email.split('@')[1];
    return domain.split('.')[0];
  }
  public resolveFromLocalStorage(): string {
    const encryptedTenantId = localStorage.getItem('_tntid');
    if (!encryptedTenantId) return 'public';
    try {
      return this.cryptoService.decrypt(encryptedTenantId);
    }catch (e){
        //this.authService.signOut()
        return '';
    }
  }
}

