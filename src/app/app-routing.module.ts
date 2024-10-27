import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { LoginGuard } from './services/login.guard';
import { AuthGuard } from './services/auth.guard';
import { PartyListComponent } from './party-management/party-list/party-list.component';
import { PartyFormComponent } from './party-management/party-form/party-form.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  // Prevent access to login if already logged in
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  // Party List is protected
  { path: 'list', component: PartyListComponent, canActivate: [AuthGuard] },

  // Adding a new party form is protected
  { path: 'add', component: PartyFormComponent, canActivate: [AuthGuard] },

  // Editing a party form is protected
  { path: 'add/:id', component: PartyFormComponent, canActivate: [AuthGuard] },

  // Default route: redirect to /home if no path is provided
  { path: '', redirectTo: '/list', pathMatch: 'full' },
    // Redirect without canActivate here
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
