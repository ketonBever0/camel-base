import { Routes } from '@angular/router';
import { camelRoutes } from '@features/camels/camels.routes';
import { HomePage } from './features/home/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'camels',
    loadChildren: () => import('./features/camels/camels.routes').then((m) => m.camelRoutes),
  },

  { path: '**', component: HomePage, redirectTo: '' },
];
