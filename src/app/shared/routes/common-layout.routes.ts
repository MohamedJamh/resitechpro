import { Routes } from '@angular/router';

export const CommonLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    }
];
