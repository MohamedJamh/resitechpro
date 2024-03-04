import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { fullLayoutRoutes } from './shared/routes/full-layout.routes';
import { CommonLayoutRoutes } from './shared/routes/common-layout.routes';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: CommonLayoutRoutes
    },
    {
        path: '',
        component: FullLayoutComponent,
        children: fullLayoutRoutes
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
