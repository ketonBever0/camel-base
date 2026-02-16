import { Injectable } from '@angular/core';
import { ConfirmBoxComponent } from '@shared/components/confirm-box/confirm-box.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  private modal!: ConfirmBoxComponent;

  register(modal: ConfirmBoxComponent) {
    this.modal = modal;
  }

  async confirm(message: string) {
    return await this.modal.open(message);
  }
}
