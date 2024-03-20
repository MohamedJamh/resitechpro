import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {OverviewDashboardComponent} from "./pages/overview/overview-dashboard.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
    {
        path: 'overview',
        component: DashboardComponent,
        data: {
            title: 'Dashboard ',
            headerDisplay: 'none'
        }
    },
    {
      path: 'home',
      component: OverviewDashboardComponent,
      data: {
        title: 'Overview',
        headerDisplay: 'none'
      }
    },
    {
      path: 'profile',
      component: ProfileComponent,
      data: {
        title: 'Profile',
        headerDisplay: 'none'
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
