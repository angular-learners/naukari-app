import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeComponent } from './user-home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { JobsComponent } from './jobs/jobs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserHomeComponent,
    ProfileComponent,
    SettingsComponent,
    JobsComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    UserHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserHomeModule { }
