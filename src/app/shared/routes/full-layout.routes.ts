import { Routes, RouterModule } from '@angular/router';

export const fullLayoutRoutes: Routes = [

    {
      path: 'Home',
      loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'authentication',
        loadChildren: () => import('../../modules/authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];
