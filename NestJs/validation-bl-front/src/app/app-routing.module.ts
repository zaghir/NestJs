import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ValidationBlComponent } from './validation-bl/validation-bl.component';
import { ActivityComponent } from './validation-bl/activity/activity.component';
import { DetailsBlComponent } from './validation-bl/details-bl/details-bl.component';
import { ConfigComponent } from './config/config.component';
import { DomainComponent } from './domain/domain.component';
import { EditDomainComponent } from './domain/edit-domain/edit-domain.component';
import { EditConfigComponent } from './config/edit-config/edit-config.component';
import { ApplicationComponent } from './application/application.component';
import { EditApplicationComponent } from './application/edit-application/edit-application.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/validation-bl', pathMatch: 'full' },
  {
    path: 'validation-bl',
    component: ValidationBlComponent,
    canActivate :[AuthGuard] ,
    children: [
      { path: '', component: ActivityComponent },
      { path: 'details', component: DetailsBlComponent },
      // {
      //   path: ':id/edit',
      //   component: RecipeEditComponent,
      //   resolve: [RecipesResolverService]
      // }
    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'config',
    component: ConfigComponent ,
    canActivate :[AuthGuard] ,
    children : [
      {path : 'edit-config' , component: EditConfigComponent }
    ]
  },
  {
    path: 'domain',
    component: DomainComponent,
    canActivate :[AuthGuard] ,
    children : [
      { path :'edit-domain' , component: EditDomainComponent}
    ]
  },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate :[AuthGuard] ,
    children : [
      { path :'edit-application' , component: EditApplicationComponent}
    ]
  },
  // { path: "**" , redirectTo:"/auth"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
