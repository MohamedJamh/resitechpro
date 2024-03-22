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
            path: '/dashboard/home',
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
        title: 'PMS',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'border-horizontal',
        submenu: [
          {
            path: 'pms/residences',
            title: 'Residences',
            iconType: 'nzIcon',
            icon: 'barcode',
            iconTheme: 'outline',
            submenu: []
          },
          {
            path: 'pms/buildings',
            title: 'Buildings',
            iconType: 'nzIcon',
            icon: 'build',
            iconTheme: 'outline',
            submenu: []
          },
          {
            path: 'pms/properties',
            title: 'Properties',
            iconType: 'nzIcon',
            icon: 'property-safety',
            iconTheme: 'outline',
            submenu: []
          },
        ]
    }
]
