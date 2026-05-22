import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { DealListComponent } from './features/deals/pages/deal-list/deal-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'deals',
    component: DealListComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
