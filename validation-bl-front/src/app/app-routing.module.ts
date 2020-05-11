import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ValidationBlComponent } from './validation-bl/validation-bl.component';
import { ActivityComponent } from './validation-bl/activity/activity.component';
import { DetailsBlComponent } from './validation-bl/details-bl/details-bl.component';

const routes: Routes = [
  { path: '', redirectTo: '/validation-bl', pathMatch: 'full' },
  {
    path: 'validation-bl',
    component: ValidationBlComponent,
    children: [
      { path: '', component: ActivityComponent },
      { path: ':activity/details', component: DetailsBlComponent },
      // {
      //   path: ':id/edit',
      //   component: RecipeEditComponent,
      //   resolve: [RecipesResolverService]
      // }
    ]
  },
  { path: 'auth', component: AuthComponent },
  // { path: "**" , redirectTo:"/auth"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
