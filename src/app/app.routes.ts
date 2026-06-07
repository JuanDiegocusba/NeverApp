import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },  {
    path: 'categorias',
    loadComponent: () => import('./pages/categorias/categorias.page').then( m => m.CategoriasPage)
  }

];
