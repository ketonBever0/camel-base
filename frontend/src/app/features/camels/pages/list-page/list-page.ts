import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  Signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private readonly modalService: NgbModal,
  ) {
    this.camelForm = formBuilder.group({
      name: ['', Validators.required],
      color: [''],
      humpCount: [null],
      lastFedDate: [new Date().toISOString().split('T')[0]],
      lastFedTime: [new Date().toISOString().split('T')[1]],
    });
  }

  ngOnInit() {
    this.camels$ = this.camelService.getCamels();
  }

  @ViewChild('camelModal') camelModal!: TemplateRef<any>;

  // camelsPending = signal(true);

  camelForm: FormGroup;

  camels$!: Observable<Camel[]>;

  editingId: WritableSignal<number | null> = signal(null);

  startEditing(c: Camel | null = null) {
    if (c) this.editingId.set(c.id);

    this.camelForm.patchValue({
      name: c ? c.name : '',
      color: c ? c.color : '',
      humpCount: c ? c.humpCount : null,
      lastFedDate:
        c && c?.lastFed
          ? new Date(c.lastFed).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      lastFedTime:
        c && c?.lastFed
          ? new Date(c.lastFed).toISOString().split('T')[1].split('.')[0]
          : new Date().toISOString().split('T')[1].split('.')[0],
    });
    this.openModal();
  }

  stopEditing() {
    this.editingId.set(null);
  }

  submitEdit() {
    this.stopEditing();
  }

  openModal() {
    this.modalService.open(this.camelModal);
  }
}
