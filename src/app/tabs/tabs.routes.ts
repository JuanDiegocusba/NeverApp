import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard/dashboard.page').then(m => m.DashboardPage),
      },
      {
        path: 'inventario',
        loadComponent: () => import('../pages/inventario/inventario.page').then(m => m.InventarioPage),
      },
      {
        path: 'compras',
        loadComponent: () => import('../pages/lista-compras/lista-compras.page').then(m => m.ListaComprasPage),
      },
      {
        path: 'alertas',
        loadComponent: () => import('../pages/alertas/alertas.page').then(m => m.AlertasPage),
      },
      {
        path: 'ajustes',
        loadComponent: () => import('../pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage),
      },
      {
        path: 'categorias',
        loadComponent: () => import('../pages/categorias/categorias.page').then(m => m.CategoriasPage),
      },
      {
        path: '',
        redirectTo: 'dashboard', // <-- Redirecciona al dashboard si entran a /tabs suelto
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/dashboard', // <-- ESTA LÍNEA ES CLAVE: Si entran a la app vacía, los manda directo a las pestañas
    pathMatch: 'full',
    
  },
  
];