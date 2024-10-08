import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './team-car/pages/dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: '',
        pathMatch: 'full',
       redirectTo:'login'
      },
];
