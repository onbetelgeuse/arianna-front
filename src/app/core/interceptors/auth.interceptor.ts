import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

const SkipUrls = [environment.api.auth + '/login'];

export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any> = req;
    const authToken: string | null = this.authService.getAuthToken();
    if (authToken && ![...SkipUrls].some((url: string) => req.url.match(url))) {
      authReq = this.setHeaders(req, authToken);
    }
    return next.handle(authReq);
  }

  private setHeaders(
    req: HttpRequest<any>,
    authToken: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `${environment.TOKEN_TYPE} ${authToken}`,
      },
    });
  }
}

export const AuthHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthHttpInterceptor,
  multi: true,
  deps: [AuthService],
};
