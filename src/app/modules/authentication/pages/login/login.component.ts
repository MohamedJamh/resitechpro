import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {User} from "../../../../shared/models/iuser.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {CryptoService} from "../../../../shared/services/crypto.service";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../../shared/models/response.model";
import {Auth} from "../../../../shared/models/iauth.model";
import {TenantService} from "../../../../shared/services/tenant.service";
import {Router} from "@angular/router";


@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private cryptoService: CryptoService,
      private tenantService: TenantService,
      private _router: Router
    ) {
    }

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: [ null, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ]
      });
    }

    submitForm(): void {
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[ i ].markAsDirty();
            this.loginForm.controls[ i ].updateValueAndValidity();
        }
        if( ! this.loginForm.invalid) {
          const { email, password } = this.loginForm.value;
          const user = {
            'email': email,
            'password': password
          } as User;
          this.authService.signIn(user).subscribe((response : HttpResponse<Response<Auth>>) => {
            if( [200].includes(response.status) && response.body?.result){
              alert("sign-in successful!")
              const signedInUser = response.body?.result.user!;
              const encryptedUser : string = this.cryptoService.encrypt(JSON.stringify(signedInUser));
              localStorage.setItem('_tntid',this.cryptoService.encrypt(this.tenantService.resolveFromEmail(signedInUser.email!)))
              localStorage.setItem('_resuser', encryptedUser);
              localStorage.setItem('_resacctoken', response.body?.result.accessToken!);
              localStorage.setItem('_resreftoken', response.body?.result.refreshToken!);
              this._router.navigate(['/dashboard']);
            }else {
              alert(response.body?.message);
            }
          });
        }
    }

}
