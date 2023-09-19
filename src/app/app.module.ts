import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AddEditJobComponent } from './modules/admin-home/add-edit-job/add-edit-job.component';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [AppComponent, NavbarComponent, SidebarComponent, ToolbarComponent, LoginComponent, CreateAccountComponent, AddEditJobComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
