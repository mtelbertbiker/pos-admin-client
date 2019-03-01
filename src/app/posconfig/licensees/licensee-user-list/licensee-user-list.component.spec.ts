import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseeUserListComponent } from './licensee-user-list.component';

describe('LicenseeUserListComponent', () => {
  let component: LicenseeUserListComponent;
  let fixture: ComponentFixture<LicenseeUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseeUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseeUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
