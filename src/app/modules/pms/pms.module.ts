import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PmsRoutingModule} from "./pms-routing.module";
import {ResidencesComponent} from "./pages/setting/residences.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from '@agm/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

const antdModule = [
  NzCardModule,
  NzSkeletonModule,
  NzAvatarModule,
  NzPaginationModule,
  NzDividerModule,
  NzButtonModule,
  NzListModule,
  NzTableModule,
  NzRadioModule,
  NzRateModule,
  NzTabsModule,
  NzTagModule,
  NzFormModule,
  NzDatePickerModule,
  NzSelectModule,
  NzSwitchModule,
  NzUploadModule,
  NzToolTipModule,
  NzModalModule,
  NzMessageModule,
  NzInputModule,
  NzCarouselModule
]


@NgModule({
  declarations: [
    ResidencesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PmsRoutingModule,
    ...antdModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDE__waFjQfC717CkdxkeclbVfjt0omgxg'
    })
  ]
})
export class PmsModule { }
