import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

export enum SocketEvent {
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  DISCONNECT = 'disconnect',
}

@Injectable({
  providedIn: 'root',
})
export abstract class WebsocketService {
  protected socket?: Socket;
  constructor(protected readonly authService: AuthService) {}

  public init(url?: string): void {
    this.socket = io(url || '/', {
      transports: ['polling', 'websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 3,
      withCredentials: true,
      auth: (cb: (data: any) => void) =>
        cb({ token: this.authService.getAuthToken() }),
    });

    this.onInit();
  }

  public get isConnected(): boolean {
    return this.socket?.connected === true;
  }

  protected abstract onInit(): void;

  public connect(): void {
    this.socket?.connect();
  }

  public fromEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket?.on(eventName, (data: T) => subscriber.next(data));
    });
  }

  public sendEvent<T>(eventName: string, data: T): void {
    this.socket?.emit(eventName, data);
  }
}
