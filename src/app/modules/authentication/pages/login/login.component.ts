import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {User} from "../../../../shared/models/iuser.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {CryptoService} from "../../../../shared/services/crypto.service";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../../shared/models/response.model";
import {Auth} from "../../../../shared/models/iauth.model";
import {TenantResolver} from "../../../../shared/utils/tenant.resolver";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Store} from "@ngrx/store";


@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private cryptoService: CryptoService,
      private tenantService: TenantResolver,
      private _router: Router,
      private notification: NzNotificationService
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
              this.notification.create(
                'success',
                'login success',
                'You have successfully logged in. You will be redirected to the dashboard shortly..'
              );
              this.authService.setCurrentUser(response.body.result as Auth)
              this._router.navigate(['/dashboard/home']);
            }else {
              alert(response.body?.message);
            }
          });
        }
    }

}
