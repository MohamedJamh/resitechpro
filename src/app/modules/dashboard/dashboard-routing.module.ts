import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {OverviewDashboardComponent} from "./pages/overview/overview-dashboard.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
    {
        path: 'overview',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Dashboard ',
            headerDisplay: 'none'
        }
    },
    {
      path: 'home',
      component: OverviewDashboardComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Overview',
        headerDisplay: 'none'
      }
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard],
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
