import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth/auth.guard';
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
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
