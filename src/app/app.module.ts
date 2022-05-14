import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptorProvider } from './core/interceptors/app.interceptor';
import { AuthHttpInterceptorProvider } from './core/interceptors/auth.interceptor';
import { RefreshHttpInterceptorProvider } from './core/interceptors/refresh.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    AppHttpInterceptorProvider,
    AuthHttpInterceptorProvider,
    RefreshHttpInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
