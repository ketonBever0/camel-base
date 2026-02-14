import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ) {
    this.editForm = formBuilder.group({
      name: ['', Validators.required],
      color: [''],
      humpCount: [null],
    });
  }

  ngOnInit() {
    this.camels$ = this.camelService.getCamels();
  }

  editForm: FormGroup;

  camels$!: Observable<Camel[]>;

  editingId: WritableSignal<number | null> = signal(null);

  startEditing(id: number) {
    this.editingId.set(id);
  }

  stopEditing() {
    this.editingId.set(null);
  }

  submitEdit() {
    this.stopEditing();
  }
}
