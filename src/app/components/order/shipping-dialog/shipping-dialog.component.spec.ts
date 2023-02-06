import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDialogComponent } from './shipping-dialog.component';

describe('ShippingDialogComponent', () => {
  let component: ShippingDialogComponent;
  let fixture: ComponentFixture<ShippingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
