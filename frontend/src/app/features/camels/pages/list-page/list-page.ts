import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamelService } from '@core/services/camel.service';
import { Camel } from '@models/camel';
import { filter, from, Observable, switchMap, tap } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@core/services/toast.service';
import { ConfirmService } from '@core/services/confirm.service';
import { allowedHumpCountValidator } from '@features/camels/directives/allowed-hump-count.directive';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-page',
  imports: [AsyncPipe, ReactiveFormsModule, DatePipe, NgClass],
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
    private readonly cdRef: ChangeDetectorRef,
  ) {
    this.camelForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: [''],
      humpCount: [null, [Validators.required, allowedHumpCountValidator()]],
      lastFedDate: [new Date().toLocaleDateString().replaceAll('. ', '-').split('.')[0]],
      lastFedTime: [new Date().toLocaleTimeString()],
    });
  }

  get camelName() {
    return this.camelForm.get('name');
  }

  get camelHumpCount() {
    return this.camelForm.get('humpCount');
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
    if (!c) {
      this.camelForm.reset();
    }
    this.editingId.set(c ? c.id : null);

    this.camelForm.patchValue({
      name: c ? c.name : '',
      color: c ? c.color : '',
      humpCount: c ? c.humpCount : null,
      lastFedDate:
        c && c?.lastFed
          ? new Date(c.lastFed).toLocaleDateString().replaceAll('. ', '-').split('.')[0]
          : new Date().toLocaleDateString().replaceAll('. ', '-').split('.')[0],
      lastFedTime:
        c && c?.lastFed
          ? new Date(c.lastFed).toLocaleTimeString()
          : new Date().toLocaleTimeString(),
    });
    this.openModal();
  }

  nowDateClick() {
    this.camelForm.controls['lastFedDate'].setValue(
      new Date().toLocaleDateString().replaceAll('. ', '-').split('.')[0],
    );
    this.camelForm.controls['lastFedTime'].setValue(
      new Date().toLocaleTimeString().replaceAll('. ', '-').split('.')[0],
    );
  }

  stopEditing() {
    this.modalRef!.close();
    this.editingId.set(null);
  }

  submitEdit() {
    if (this.camelForm.valid) {
      const payload: Camel = {
        id: this.editingId() || 0,
        name: this.camelName!.value || '',
        color: this.camelForm.get('color')?.value || '',
        humpCount: this.camelHumpCount!.value || 0,
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
        error: (resErr: HttpErrorResponse) => {
          console.error('Submit error', resErr);
          const validationErrors = resErr.error.errors;
          if (validationErrors) {
            if (validationErrors.Name) {
              // this.ts.show('Name error from server', validationErrors[0]);
            }
            if (validationErrors.HumpCount) {
              setTimeout(() => {
                this.ts.show('Hump Count error from server', validationErrors.HumpCount[0]);
              });
            }
          }
        },
      });
    } else {
      if (this.camelName?.hasError('required') || this.camelName?.hasError('minlength')) {
        this.ts.show('Form error', 'Name must be at least 2 characters long.');
      }
      if (this.camelHumpCount?.hasError('invalidHumpCount')) {
        this.ts.show('Form error', 'Only 1 and 2 are allowed for Hump Count.');
      }
    }
  }

  modalRef: NgbModalRef | null = null;

  openModal() {
    this.modalRef = this.modalService.open(this.camelModal);
  }

  deleteClick(id: number) {
    from(this.confirmBox.confirm('Are you sure?'))
      .pipe(
        filter((yes) => yes),
        switchMap(() => this.camelService.deleteCamel(id)),
        tap(() => this.ts.show('Deleted', '')),
        switchMap(() => this.camelService.getCamels()),
      )
      .subscribe(() => {
        this.loadCamels();
        this.cdRef.detectChanges();
      });
  }
}
