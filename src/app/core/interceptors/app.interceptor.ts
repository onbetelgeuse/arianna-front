import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let appReq = this.setHeaders(req);
    return next.handle(appReq);
  }

  private setHeaders(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}

export const AppHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppHttpInterceptor,
  multi: true,
};
