import { Inject, Injectable, InjectionToken } from '@angular/core';

export const LOCALE_STORAGE: InjectionToken<string> =
  new InjectionToken<Storage>('__LOCAL_STORAGE', {
    providedIn: 'root',
    factory: () => window.localStorage,
  });

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(LOCALE_STORAGE) private readonly storage: Storage) {}

  public set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get<T = string>(key: string): T | null {
    const value: string | null = this.storage.getItem(key);
    return value !== null ? (JSON.parse(value) as T) : null;
  }

  public getDate(key: string): Date | null {
    const value: string | null = this.storage.getItem(key);
    return value !== null ? new Date(JSON.parse(value)) : null;
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }
}
