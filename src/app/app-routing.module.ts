import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
 {path:'login',component:LoginComponent},
 {path:'create-account',component:CreateAccountComponent},
 {path:'',loadChildren:()=>import('./modules/user-home/user-home.module').then(m=>m.UserHomeModule)},
 {path:'',loadChildren:()=>import('./modules/admin-home/admin-home.module').then(m=>m.AdminHomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
