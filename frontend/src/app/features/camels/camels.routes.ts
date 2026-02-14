import { Routes } from '@angular/router';

export const camelRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/list-page/list-page').then((m) => m.ListPage),
  },
];
