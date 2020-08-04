import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseePaymentComponent } from './licensee-payment.component';

describe('LicenseePaymentComponent', () => {
  let component: LicenseePaymentComponent;
  let fixture: ComponentFixture<LicenseePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
