import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ViewComponent } from './meetings/view/view.component';
import { IndexComponent } from './meetings/index/index.component';
import { EditComponent } from './meetings/edit/edit.component';
import { CreateComponent } from './meetings/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    ViewComponent,
    IndexComponent,
    EditComponent,
    CreateComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
