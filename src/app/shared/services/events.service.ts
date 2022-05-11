import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, pipe } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SocketEvent, WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService extends WebsocketService {
  constructor(protected override readonly authService: AuthService) {
    super(authService);
  }

  protected onInit(): void {
    this.fromEvent(SocketEvent.CONNECT_ERROR).subscribe((error: any) => {
      this.authService
        .refreshToken()
        .pipe(first())
        .subscribe(() => this.connect());
    });
  }
}
