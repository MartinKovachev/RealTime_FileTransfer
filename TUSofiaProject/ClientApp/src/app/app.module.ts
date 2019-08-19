import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { Routing } from './app.routing';
import { FilesTransferService } from './services/files-transfer.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Routing
  ],
  providers: [FilesTransferService, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
