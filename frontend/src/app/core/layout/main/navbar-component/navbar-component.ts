import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgbDropdown,
  NgbDropdownToggle,
  NgbDropdownMenu,
  NgbDropdownItem,
  NgbDropdownButtonItem,
} from '@ng-bootstrap/ng-bootstrap/dropdown';

@Component({
  selector: 'navbar-component',
  imports: [
    // NgbDropdown,
    // NgbDropdownToggle,
    // NgbDropdownMenu,
    // NgbDropdownItem,
    // NgbDropdownButtonItem,
    RouterLink,
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {}
