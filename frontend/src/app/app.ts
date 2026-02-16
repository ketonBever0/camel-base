import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/main/navbar-component/navbar-component';
import { CamelService } from './core/services/camel.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ConfirmService } from './core/services/confirm.service';
import { ConfirmBoxComponent } from './shared/components/confirm-box/confirm-box.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ToastComponent, ConfirmBoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  constructor(private confirmService: ConfirmService) {}

  @ViewChild('confirmModal') confirmModal!: ConfirmBoxComponent;

  ngAfterViewInit() {
    this.confirmService.register(this.confirmModal);
  }
}
