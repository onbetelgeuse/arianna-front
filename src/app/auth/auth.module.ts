import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessRedirectComponent } from './components/callback/success-redirect/success-redirect.component';
import { FailureRedirectComponent } from './components/callback/failure-redirect/failure-redirect.component';

@NgModule({
  declarations: [LoginComponent, SuccessRedirectComponent, FailureRedirectComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
