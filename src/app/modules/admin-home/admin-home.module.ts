import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewJobsComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
