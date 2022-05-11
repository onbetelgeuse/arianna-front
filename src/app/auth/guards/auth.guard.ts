import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UserDto } from '../../shared/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.currentUser.pipe(
      tap((user: UserDto | null) => {
        if (!user) {
          this.router.navigate(['auth/login'], {
            queryParams: { returnUrl: state.url },
          });
        }
      }),
      map((user: UserDto | null) => user !== null)
    );
  }
}
