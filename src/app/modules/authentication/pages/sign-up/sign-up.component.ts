import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import {TenantService} from "../../../../shared/services/tenant.service";
import {take} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../../../../shared/models/response.model";
import {AuthService} from "../../../../shared/services/auth.service";
import {User} from "../../../../shared/models/iuser.model";
import {Auth} from "../../../../shared/models/iauth.model";


@Component({
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent {

    signUpForm: FormGroup;
    signUpFormSubmitted: boolean = false;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService
    ) {}

    ngOnInit(): void {
      this.signUpForm = this.fb.group({
        firstName        : [ null, [ Validators.required ] ],
        lastName         : [ null, [ Validators.required ] ],
        organizationName     : [ null, [ Validators.required ] ],
        organizationId     : [ null, [ Validators.required ] ],
        personalEmail            : [ null, [ Validators.required, Validators.email ] ],
        password         : [ null, [ Validators.required, Validators.min(3) ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        agree            : [ false ],
      });
    }

    submitForm(): void {
        this.signUpFormSubmitted = true;
        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[ i ].markAsDirty();
            this.signUpForm.controls[ i ].updateValueAndValidity();
        }
        if(this.signUpForm.invalid) return;
        const userToSignUp = this.signUpForm.value as User;
        this.authService.signUp(userToSignUp).pipe(
          take(1)
        ).subscribe((response : HttpResponse<Response<Auth>>) => {
          if( [200].includes(response.status) && response.body?.result) {
            alert("Sign up successful")
            this.authService.setCurrentUser(response.body.result as Auth)
          }
        }).add(() => this.signUpFormSubmitted = false);
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

  checkOrganizationName() {
    if(this.signUpForm.controls.organizationName.invalid) return;
    this.signUpFormSubmitted = true;
  }

  disableSubmitButton() : boolean {
    return this.signUpFormSubmitted
  }
}
