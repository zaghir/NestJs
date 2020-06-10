import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidationBlComponent } from './validation-bl/validation-bl.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { ActivityComponent } from './validation-bl/activity/activity.component';
import { DetailsBlComponent } from './validation-bl/details-bl/details-bl.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ConfigComponent } from './config/config.component';
import { DomainComponent } from './domain/domain.component';
import { EditDomainComponent } from './domain/edit-domain/edit-domain.component';
import { EditConfigComponent } from './config/edit-config/edit-config.component';
import { ApplicationComponent } from './application/application.component';
import { EditApplicationComponent } from './application/edit-application/edit-application.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidationBlComponent,
    AuthComponent,
    HeaderComponent,
    ActivityComponent,
    DetailsBlComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    ConfigComponent,
    DomainComponent,
    EditDomainComponent,
    EditConfigComponent,
    ApplicationComponent,
    EditApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
