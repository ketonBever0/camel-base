import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CamelService } from '@app/core/services/camel.service';
import { Camel } from '@models/camel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  imports: [AsyncPipe],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage implements OnInit {
  constructor(protected readonly camelService: CamelService) {}

  camels$!: Observable<Camel[]>;

  ngOnInit() {
    this.camels$ = this.camelService.getCamels();
  }
}
