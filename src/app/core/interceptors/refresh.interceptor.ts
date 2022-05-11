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

const NoSkipUrls = [environment.api.auth + '/refresh'];

export class RefreshHttpInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let refreshReq: HttpRequest<any> = req;
    const refreshToken: string | null = this.authService.getRefreshToken();
    if (
      refreshToken &&
      [...NoSkipUrls].some((url: string) => req.url.match(url))
    ) {
      refreshReq = this.setHeaders(req, refreshToken);
    }
    return next.handle(refreshReq);
  }

  private setHeaders(
    req: HttpRequest<any>,
    refreshToken: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Refresh: refreshToken,
      },
    });
  }
}

export const RefreshHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshHttpInterceptor,
  multi: true,
  deps: [AuthService],
};
