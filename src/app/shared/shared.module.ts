import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import {TenantInterceptor} from "./interceptor/tenant.interceptor";
import {Auth} from "./models/iauth.model";

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NzIconModule,
        PerfectScrollbarModule,
        SearchPipe,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NzIconModule,
        NzToolTipModule,
        PerfectScrollbarModule,
    ],
    declarations: [
        SearchPipe,
    ],
    providers: [
        ThemeConstantService,
        { provide : HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true}
    ]
})

export class SharedModule { }
