import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { PagesRouting } from 'src/app/pages/pages-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { AdminComponent } from './admin.component'
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component'
import { NavbarMobileComponent } from './components/navbar/navbar-mobile/navbar-mobilecomponent'
import { NavbarSubmenuComponent } from './components/navbar/navbar-submenu/navbar-submenu.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ProfileMenuComponent } from './components/navbar/profile-menu/profile-menu.component'
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component'
import { SidebarSubmenuComponent } from './components/sidebar/sidebar-submenu/sidebar-submenu.component'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarMobileMenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-menu/navbar-mobile-menu.component';
import { NavbarMobileSubmenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-submenu/navbar-mobile-submenu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component'

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: PagesRouting,
    },
]

@NgModule({
    declarations: [
        AdminComponent,
        FooterComponent,
        SidebarComponent,
        NavbarComponent,
        SidebarMenuComponent,
        ProfileMenuComponent,
        NavbarMenuComponent,
        NavbarMobileComponent,
        SidebarSubmenuComponent,
        NavbarSubmenuComponent,
        BottomNavbarComponent,
        NavbarMobileMenuComponent,
        NavbarMobileSubmenuComponent,
        ToolbarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        SharedModule,
    ],
})
export class AdminModule { }
