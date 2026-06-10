import { TabsPage } from './tabs/tabs.page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then(m => m.RegisterPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'categorias',
    loadComponent: () =>
      import('./pages/categorias/categorias.page').then(m => m.CategoriasPage)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('./pages/inventario/inventario.page').then(m => m.InventarioPage),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./pages/categorias/categorias.page').then(m => m.CategoriasPage),
      },
      {
        path: 'compras',
        loadComponent: () =>
          import('./pages/lista-compras/lista-compras.page').then(m => m.ListaComprasPage),
      },
      {
        path: 'alertas',
        loadComponent: () =>
          import('./pages/alertas/alertas.page').then(m => m.AlertasPage),
      },
      {
        path: 'ajustes',
        loadComponent: () =>
          import('./pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];