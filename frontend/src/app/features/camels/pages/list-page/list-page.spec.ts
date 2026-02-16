import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPage } from './list-page';
import { By } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, skip, take } from 'rxjs';

describe('ListPage', () => {
  let component: ListPage;
  let fixture: ComponentFixture<ListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load camels', async () => {
    // component.ngOnInit();
    const http = TestBed.inject(HttpTestingController);

    const req = http.expectOne('http://localhost:5276/api/camels/');
    req.flush([{ id: -1, name: 'Testing Camel', humpCount: 1 }]);

    const camels = await firstValueFrom(component.camels$);
    expect(camels.length).toBe(1);

    http.verify();
  });

  let camelModal = document.querySelector('ngb-modal-window');

  it('form should be invalid', () => {
    const addButton = fixture.debugElement.query(By.css('#add-camel-btn'));
    expect(addButton).not.toBeNull();
    addButton.triggerEventHandler('click', null);

    camelModal = document.querySelector('ngb-modal-window');
    expect(camelModal).toBeTruthy();

    expect(component.camelForm.valid).toBe(false);

    component.camelForm.controls['name'].setValue('camel');
    component.camelForm.controls['humpCount'].setValue(1);

    expect(component.camelForm.valid).toBe(true);

    component.camelForm.controls['humpCount'].setValue(3);
    expect(component.camelForm.valid).toBe(false);
  });

  it('form should be valid', () => {
    const addButton = fixture.debugElement.query(By.css('#add-camel-btn'));
    expect(addButton).not.toBeNull();
    addButton.triggerEventHandler('click', null);

    camelModal = document.querySelector('ngb-modal-window');
    expect(camelModal).toBeTruthy();

    expect(component.camelForm.valid).toBe(false);

    component.camelForm.controls['name'].setValue('Test Camel');
    component.camelForm.controls['humpCount'].setValue(2);

    expect(component.camelForm.valid).toBe(true);
  });

  it('should fill the edit form', () => {
    const http = TestBed.inject(HttpTestingController);
    const req = http.expectOne('http://localhost:5276/api/camels/');
    const camelName = 'Update Testing Camel';
    req.flush([{ id: -1, name: camelName, humpCount: 2 }]);

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody .camel-row'));
    expect(rows).lengthOf(1);
    const camelRow = rows[0];
    expect(camelRow).toBeTruthy();

    const editButton = camelRow.query(By.css('.edit-btn'));
    expect(editButton).toBeTruthy();

    editButton.triggerEventHandler('click', null);
    const formName = component.camelForm.get('name')!.value;
    const formHumpCount = component.camelForm.get('humpCount')!.value;

    expect(formName).not.toBeNull();
    expect(formHumpCount).not.toBeNull();

    expect(formName).eq(camelName);
    expect(formHumpCount).eq(2);

    expect(component.camelForm.valid).toBe(true);

    component.camelForm.controls['humpCount'].setValue(3);
    expect(component.camelForm.valid).toBe(false);
  });
});
