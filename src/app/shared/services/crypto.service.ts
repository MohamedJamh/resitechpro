import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';
import {EnvService} from "./env.service";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly privateKey: string = this.envService.privateKey;
  constructor(private envService: EnvService) {
  }
  public encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.privateKey).toString();
  }
  public decrypt(data: string): string {
    return CryptoJS.AES.decrypt(data, this.privateKey).toString(CryptoJS.enc.Utf8);
  }
}
