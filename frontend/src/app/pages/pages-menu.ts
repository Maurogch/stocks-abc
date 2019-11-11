import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'SISTEMA',
    group: true
  },
  {
    title: 'Configuraciónes',
    expanded: true,
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Proveedores',
        link: '/pages/forms/layouts'
      }
    ]
  },
  {
    title: 'Tablas & Datos',
    expanded: true,
    icon: 'grid-outline',
    children: [
      {
        title: 'Artículos - Clasificación',
        link: '/pages/tables/smart-table-arts1'
      },
      {
        title: 'Artículos - Políticas de Stock',
        link: '/pages/tables/smart-table'
      }
    ]
  },
  {
    title: 'Gráficos y Calendario',
    expanded: true,
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Clasificación ABC',
        link: '/pages/charts/echarts'
      },
      {
        title: 'Calendario de entregas',
        link: '/pages/charts/d3'
      }
    ]
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login'
      },
      {
        title: 'Register',
        link: '/auth/register'
      },
      {
        title: 'Request Password',
        link: '/auth/request-password'
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password'
      }
    ]
  }
];
