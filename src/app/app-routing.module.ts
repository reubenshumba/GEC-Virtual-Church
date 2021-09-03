import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './component/not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((module) => AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (module) => DashboardModule
      ),
  },
  { path: 'auth/login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
