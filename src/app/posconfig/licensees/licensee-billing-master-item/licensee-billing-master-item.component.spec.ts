import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseeBillingMasterItemComponent } from './licensee-billing-master-item.component';

describe('LicenseeBillingMasterItemComponent', () => {
  let component: LicenseeBillingMasterItemComponent;
  let fixture: ComponentFixture<LicenseeBillingMasterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseeBillingMasterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseeBillingMasterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
