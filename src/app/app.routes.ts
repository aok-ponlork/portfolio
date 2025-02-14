import { Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';

export const routes: Routes = [ 
  { path: '', pathMatch: 'full', redirectTo: '/app' },

  {
    path: 'app',
    component: MainComponent,
  },
];
