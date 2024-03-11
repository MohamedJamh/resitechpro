import { SideNavInterface } from '../../interfaces/side-nav.type';
export const ROUTES: SideNavInterface[] = [
    {
        path: '',
        title: 'Dashboard',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'dashboard',
        submenu: [
          {
            path: '/dashboard/overview',
            title: 'Overview',
            iconType: 'nzIcon',
            icon: 'bank',
            iconTheme: 'outline',
            submenu: []
          },
          {
            path: '/dashboard/profile',
            title: 'Profile',
            iconType: 'nzIcon',
            icon: 'bank',
            iconTheme: 'outline',
            submenu: []
          }
        ]
    },
    {
        path: '',
        title: 'Multi Level Menu',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'appstore',
        submenu: [
            {
                path: '',
                title: 'Level 1',
                iconType: '',
                icon: '',
                iconTheme: '',
                submenu: [
                    {
                        path: '',
                        title: 'Level 2',
                        iconType: 'nzIcon',
                        iconTheme: 'outline',
                        icon: '',
                        submenu: []
                    }
                ]
            }
        ]
    }
]
