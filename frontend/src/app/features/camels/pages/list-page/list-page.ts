import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CamelService } from '@app/core/services/camel.service';
import { Camel } from '@models/camel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage implements OnInit {
  constructor(
    protected readonly camelService: CamelService,
    protected readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.camels$ = this.camelService.getCamels();
  }

  nameTb = new FormControl('');
  colorTb = new FormControl('');
  humpCountOption = new FormControl<1 | 2 | null>(null);
  lastFedDate = new FormControl();

  camels$!: Observable<Camel[]>;

  editingId: WritableSignal<number | null> = signal(null);

  startEditing(c: Camel) {
    this.editingId.set(c.id);

    this.nameTb.patchValue(c.name);
    this.colorTb.patchValue(c.color);
    this.humpCountOption.patchValue(c.humpCount);
    this.lastFedDate.patchValue(
      c.lastFed
        ? new Date(c.lastFed).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    );
  }

  stopEditing() {
    this.editingId.set(null);
  }

  submitEdit() {
    this.stopEditing();
  }
}
