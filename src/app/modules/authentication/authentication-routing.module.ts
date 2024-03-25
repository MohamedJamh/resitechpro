import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {LoggedGuard} from "../../shared/guards/logged.guard";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedGuard],
        data: {
            title: 'Login'
        }
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [LoggedGuard],
        data: {
            title: 'Sign Up'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
