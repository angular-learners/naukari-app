import { AdminHomeComponent } from './admin-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { AddEditJobComponent } from './add-edit-job/add-edit-job.component';

const routes: Routes = [
  {
    path:'admin-home',component:AdminHomeComponent,
    children:[
       {path:'add-edit-jobs',component:AddEditJobComponent},
       {path:'view-jobs',component:ViewJobsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
