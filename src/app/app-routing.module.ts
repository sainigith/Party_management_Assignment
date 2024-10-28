import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { LoginGuard } from './services/login.guard';
import { AuthGuard } from './services/auth.guard';
import { PartyListComponent } from './party-management/party-list/party-list.component';
import { PartyFormComponent } from './party-management/party-form/party-form.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'list', component: PartyListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: PartyFormComponent, canActivate: [AuthGuard] },
  { path: 'add/:id', component: PartyFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
