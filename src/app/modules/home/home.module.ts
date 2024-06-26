import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import {HomeRoutingModule} from "./home-routing.module";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCardModule} from "ng-zorro-antd/card";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {AgmCoreModule} from "@agm/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzLayoutModule,
    NzCarouselModule,
    NzInputModule,
    NzFormModule,
    NzCardModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzWaveModule,
    NzBreadCrumbModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzAvatarModule,
    NzIconModule,
    NzDividerModule,
    NzSkeletonModule,
    NzTabsModule,
    NzTagModule,
    NzModalModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDE__waFjQfC717CkdxkeclbVfjt0omgxg'
    })
  ]
})
export class HomeModule { }
