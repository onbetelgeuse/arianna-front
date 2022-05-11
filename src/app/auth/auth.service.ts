import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccessTokenWithUserDto } from '../shared/dto/access-token.dto';
import { UserDto } from '../shared/dto/user.dto';
import { DateService } from '../shared/services/date.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUser$: BehaviorSubject<UserDto | null>;
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: LocalStorageService,
    private dateService: DateService
  ) {
    const user: UserDto | null = this.getUser();
    this.currentUser$ = new BehaviorSubject(user);
  }

  public get currentUser(): Observable<UserDto | null> {
    return this.currentUser$.asObservable();
  }

  public get isLoggedIn(): boolean {
    const user: UserDto | null = this.getUser();
    return user !== null;
  }

  public login(email: string, password: string) {
    return this.http
      .post<AccessTokenWithUserDto>(environment.api.auth + '/login', {
        email,
        password,
      })
      .pipe(
        tap((res: AccessTokenWithUserDto) => {
          this.setExpiry(res.expiresIn);
          this.setAuthToken(res.accessToken);
          this.setRefreshToken(res.refreshToken);
          this.setUser(res.user);
          this.currentUser$.next(res.user);
        })
      );
  }

  public refreshToken(): Observable<AccessTokenWithUserDto> {
    return this.http
      .post<AccessTokenWithUserDto>(environment.api.auth + '/refresh', {})
      .pipe(
        tap((res: AccessTokenWithUserDto) => {
          this.setExpiry(res.expiresIn);
          this.setAuthToken(res.accessToken);
          this.setRefreshToken(res.refreshToken);
          this.setUser(res.user);
          this.currentUser$.next(res.user);
        })
      );
  }

  public isInRole(...roles: string[]): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: UserDto | null) =>
        user!.roles.some((role: string) => roles?.includes(role))
      )
    );
  }

  public getAuthToken(): string | null {
    return this.storageService.get(environment.AUTH_TOKEN);
  }

  public setAuthToken(authToken: string): void {
    this.storageService.set(environment.AUTH_TOKEN, authToken);
  }

  public setExpiry(expiresIn: number): void {
    if (expiresIn) {
      const expiryDate: Date = this.dateService.getCurrent();
      expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
      this.storageService.set(environment.EXPIRY_DATE, expiryDate);
    }
  }

  public isAuthTokenExpired(): boolean {
    const now: Date = this.dateService.getCurrent();
    const expiryDate: Date | null = this.getExpiry();
    return expiryDate != null ? now > expiryDate : true;
  }

  public getRefreshToken(): string | null {
    return this.storageService.get(environment.REFRESH_TOKEN);
  }

  public setRefreshToken(refreshToken: string | undefined): void {
    if (refreshToken) {
      this.storageService.set(environment.REFRESH_TOKEN, refreshToken);
    }
  }

  private removeAuthToken(): void {
    this.storageService.remove(environment.AUTH_TOKEN);
  }

  private getExpiry(): Date | null {
    return this.storageService.getDate(environment.EXPIRY_DATE);
  }

  private removeExpiry(): void {
    this.storageService.remove(environment.EXPIRY_DATE);
  }

  private removeRefreshToken(): void {
    this.storageService.remove(environment.REFRESH_TOKEN);
  }

  private getUser(): UserDto | null {
    return this.storageService.get<UserDto>(environment.USER);
  }

  private setUser(user: UserDto): void {
    this.storageService.set(environment.USER, user);
  }

  private removeUser(): void {
    this.storageService.remove(environment.USER);
  }
}
