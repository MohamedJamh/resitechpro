import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";


// @ts-ignore
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    AngularSvgIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted : boolean = false;
  passwordTextType!: boolean;
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organizationName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', Validators.required],
      passwordConfirm: ['',Validators.required]
    });
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  signUp() {
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    alert('Sign up successful');
  }


  get formControls() {
    return this.form.controls;
  }
}
