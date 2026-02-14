import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'camels',
    loadChildren: () => import('./features/camels/camels.routes').then((m) => m.camelRoutes),
  },
];
