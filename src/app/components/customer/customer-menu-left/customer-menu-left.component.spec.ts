import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMenuLeftComponent } from './customer-menu-left.component';

describe('CustomerMenuLeftComponent', () => {
  let component: CustomerMenuLeftComponent;
  let fixture: ComponentFixture<CustomerMenuLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMenuLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
