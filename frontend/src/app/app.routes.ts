import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Home - Camel Base' },
  {
    path: 'camels',
    loadChildren: () => import('./features/camels/camels.routes').then((m) => m.camelRoutes),
  },

  { path: '**', component: HomePage, redirectTo: '' },
];
