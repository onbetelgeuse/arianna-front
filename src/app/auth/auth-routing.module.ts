import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailureRedirectComponent } from './components/callback/failed/failure-redirect.component';
import { SuccessRedirectComponent } from './components/callback/success/success-redirect.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callback/success', component: SuccessRedirectComponent },
  { path: 'callback/failed', component: FailureRedirectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
