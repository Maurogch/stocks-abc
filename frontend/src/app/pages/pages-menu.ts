import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard'
  },
  {
    title: 'FEATURES',
    group: true
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper'
      },
      {
        title: 'List',
        link: '/pages/layout/list'
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list'
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion'
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs'
      }
    ]
  },
  {
    title: 'Configuraciónes',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs'
      },
      {
        title: 'Proveedores',
        link: '/pages/forms/layouts'
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons'
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker'
      }
    ]
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid'
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons'
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography'
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields'
      }
    ]
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog'
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window'
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover'
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr'
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip'
      }
    ]
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar'
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar'
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner'
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert'
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit'
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat'
      }
    ]
  },
  {
    title: 'Gráficos',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Clasificación ABC',
        link: '/pages/charts/echarts'
      }
    ]
  },
  {
    title: 'Tablas & Datos',
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
