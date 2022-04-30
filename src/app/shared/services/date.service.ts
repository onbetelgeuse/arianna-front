import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public getCurrent(): Date {
    return new Date();
  }
}
