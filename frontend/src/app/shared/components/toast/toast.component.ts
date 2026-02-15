import { Component } from '@angular/core';
import { ToastService } from '@core/services/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [NgbToast],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(protected readonly ts: ToastService) {}
}
