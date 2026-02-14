import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/main/navbar-component/navbar-component';
import { CamelService } from './core/services/camel.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  providers: [CamelService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('camel-frontend');
}
