import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {AuthService} from "../../services/AuthService";
import {User} from "../../../../core/models/IUser";
import {Response} from "../../../../core/utils/Response";
import {Auth} from "../../../../core/models/IAuth";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    NgForOf,
  ],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted : boolean = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;
    if (this.form.invalid) return;
    const user = {
      'email': email,
      'password': password
    } as User;
    this.authService.signin(user).subscribe((response : HttpResponse<Response<Auth>>) => {
      if( [200,201].includes(response.status) && response.body?.result){
        console.log(response.body?.result);
        localStorage.setItem('resitechprotoken', response.body?.result.accessToken!);
        this._router.navigate(['/']);
      }else {
        alert(response.body?.message);
      }
    });
  }
}
