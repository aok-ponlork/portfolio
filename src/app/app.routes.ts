import { Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/app/about-me' },
  {
    path: 'app',
    component: MainComponent,
    loadChildren: () =>
      import('./modules/core.routes').then((m) => m.MODULE_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
