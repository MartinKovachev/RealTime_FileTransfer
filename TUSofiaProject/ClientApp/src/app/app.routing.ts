import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
