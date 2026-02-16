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

  // beforeEach(() => {
  //   TestBed.configureTestingModule({ declarations: [ListPage] });
  //   fixture = TestBed.createComponent(ListPage);
  //   component = fixture.componentInstance;
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load camels', async () => {
    const http = TestBed.inject(HttpTestingController);
    // component.ngOnInit();

    const req1 = http.expectOne('http://localhost:5276/api/camels/');
    req1.flush([{ id: -1, name: 'Testing Camel', humpCount: 1 }]);

    const camels = await firstValueFrom(component.camels$);
    expect(camels.length).toBe(1);

    http.verify();
  });

  it('should create add form', async () => {
    let camelModal = document.querySelector('ngb-modal-window');
    expect(camelModal).toBeNull();

    const addButton = fixture.debugElement.query(By.css('#form-open-btn'));
    expect(addButton).not.toBeNull();
    addButton.triggerEventHandler('click', null);

    camelModal = document.querySelector('ngb-modal-window');
    expect(camelModal).toBeTruthy();

    component.camelForm.controls['name'].setValue('Test Camel');
    component.camelForm.controls['humpCount'].setValue(2);

    expect(component.camelForm.valid).toBe(true);
  });
});
