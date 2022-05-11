import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptorProvider } from './core/interceptors/app.interceptor';
import { AuthHttpInterceptorProvider } from './core/interceptors/auth.interceptor';
import { RefreshHttpInterceptorProvider } from './core/interceptors/refresh.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AppHttpInterceptorProvider,
    AuthHttpInterceptorProvider,
    RefreshHttpInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
