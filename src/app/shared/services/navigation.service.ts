import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public navigateByUrl(url: string): void {
    this.document.location.href = url;
  }

  public isExternalUrl(url: string): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      !url.includes(this.document.location.host)
    );
  }
}
