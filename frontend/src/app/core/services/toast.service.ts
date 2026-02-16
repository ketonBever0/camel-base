import { Injectable, signal } from '@angular/core';
export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<ToastInfo[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(header: string, body: string) {
    this._toasts.update((prev) => [...prev, { header, body }]);
  }

  remove(toast: ToastInfo) {
    this._toasts.update((prev) => prev.filter((x) => x != toast));
  }
}
