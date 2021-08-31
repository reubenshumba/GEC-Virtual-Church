import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CreateComponent } from './meetings/create/create.component';
import { EditComponent } from './meetings/edit/edit.component';
import { IndexComponent } from './meetings/index/index.component';
import { ViewComponent } from './meetings/view/view.component';

const routes: Routes = [
  {
    path: 'meeting',
    component: DashboardComponent,
    children: [
      {
        path: 'view/:id',
        component: ViewComponent,
      },
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      {
        path: 'add',
        component: CreateComponent,
      },
      {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
