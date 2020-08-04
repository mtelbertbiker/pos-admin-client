import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseePricingComponent } from './licensee-pricing.component';

describe('LicenseePricingComponent', () => {
  let component: LicenseePricingComponent;
  let fixture: ComponentFixture<LicenseePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
