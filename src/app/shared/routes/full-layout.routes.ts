import { Routes, RouterModule } from '@angular/router';

export const fullLayoutRoutes: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('../../modules/authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];
