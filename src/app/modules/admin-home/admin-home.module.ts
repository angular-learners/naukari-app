import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewJobsComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    FormsModule
  ]
})
export class AdminHomeModule { }
