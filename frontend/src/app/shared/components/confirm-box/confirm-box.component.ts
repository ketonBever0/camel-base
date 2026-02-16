import { Component, Input } from '@angular/core';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-box',
  imports: [],
  templateUrl: './confirm-box.component.html',
  styleUrl: './confirm-box.component.scss',
})
export class ConfirmBoxComponent {
  title = 'Confirm';
  message = 'Msg';

  private resolver!: (value: boolean) => void;

  open(message: string): Observable<boolean> {
    this.message = message;

    const modalEl = document.getElementById('confirmModal')!;
    const modal = new Modal(modalEl);

    modal.show();

    return new Observable<boolean>((sub) => {
      this.resolver = (value) => {
        sub.next(value);
        sub.complete();
      };
    });
  }

  yes() {
    this.resolver(true);
    this.close();
  }

  no() {
    this.resolver(false);
    this.close();
  }

  private close() {
    const modalEl = document.getElementById('confirmModal')!;
    const modal = Modal.getInstance(modalEl);
    modal?.hide();
  }
}
