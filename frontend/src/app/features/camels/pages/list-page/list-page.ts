import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamelService } from '@core/services/camel.service';
import { Camel } from '@models/camel';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { allowedHumpCountValidator } from '@features/camels/directives/allowed-hump-count.directive';

@Component({
  selector: 'app-list-page',
  imports: [AsyncPipe, ReactiveFormsModule, DatePipe],
  templateUrl: './list-page.html',
  styleUrl: './list-page.scss',
})
export class ListPage implements OnInit {
  constructor(
    protected readonly camelService: CamelService,
    protected readonly formBuilder: FormBuilder,
    private readonly modalService: NgbModal,
    private readonly ts: ToastService,
    private readonly confirmBox: ConfirmService,
  ) {
    this.camelForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: [''],
      humpCount: [null, allowedHumpCountValidator()],
      lastFedDate: [new Date().toISOString().split('T')[0]],
      lastFedTime: [new Date().toISOString().split('T')[1]],
    });
  }

  ngOnInit() {
    this.loadCamels();
  }

  loadCamels() {
    this.camels$ = this.camelService.getCamels();
  }

  camelsPending = signal(false);

  @ViewChild('camelModal') camelModal!: TemplateRef<any>;

  camelForm: FormGroup;

  camels$!: Observable<Camel[]>;

  editingId: WritableSignal<number | null> = signal(null);

  startEditing(c: Camel | null) {
    this.editingId.set(c ? c.id : null);

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
    this.modalRef!.close();
    this.editingId.set(null);
  }

  submitEdit() {
    if (this.camelForm.valid) {
      const payload: Camel = {
        id: this.editingId() || 0,
        name: this.camelForm.get('name')!.value.strip(),
        color: this.camelForm.get('color')?.value.strip(),
        humpCount: this.camelForm.get('humpCount')!.value,
        lastFed: `${this.camelForm.get('lastFedDate')!.value}T${this.camelForm.get('lastFedTime')!.value}Z`,
      };

      const request$ = this.editingId()
        ? this.camelService.updateCamel(payload)
        : this.camelService.addCamel(payload);

      request$.subscribe({
        next: (c) => {
          this.loadCamels();
          this.ts.show('Success', `${c.name} ${this.editingId() ? 'edited' : 'added'}`);
          this.stopEditing();
          this.camelForm.reset();
        },
        error: (e) => {
          console.error('Submit error', e);
        },
      });
    } else {
      if (
        this.camelForm.get('name')?.hasError('required') ||
        this.camelForm.get('name')?.hasError('minlength')
      ) {
        this.ts.show('Form error', 'Name must be at least 2 characters long.');
      }
      if (this.camelForm.get('humpCount')?.hasError('invalidHumpCount')) {
        this.ts.show('Form error', 'Only 1 and 2 are allowed for Hump Count.');
      }
    }
  }

  modalRef: NgbModalRef | null = null;

  openModal() {
    this.modalRef = this.modalService.open(this.camelModal);
  }

  deleteClick(id: number) {
    this.confirmBox.confirm('Are you sure?').then((yes) => {
      if (yes) {
        this.camelService.deleteCamel(id).subscribe({
          next: () => {
            this.ts.show('Deleted', '');
            this.loadCamels();
          },
          error: (e) => {
            console.error('Delete error', e);
          },
        });
      }
    });
  }
}
