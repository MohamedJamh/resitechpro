import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './dashboard.component';

/** Import any ng-zorro components as the module required except icon module */
import { NzButtonModule } from 'ng-zorro-antd/button';
import {OverviewDashboardComponent} from "./pages/overview/overview-dashboard.component";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NgChartjsModule} from "ng-chartjs";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTagModule} from "ng-zorro-antd/tag";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";

/** Assign all ng-zorro modules to this array*/
const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzCheckboxModule,
  NzAvatarModule,
  NzCardModule,
  NzRadioModule,
  NgChartjsModule,
  NzPaginationModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  ReactiveFormsModule
]

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ...antdModule,
  ],
    exports: [],
    declarations: [
        DashboardComponent,
        OverviewDashboardComponent,
        ProfileComponent
    ]
})
export class DashboardModule { }
