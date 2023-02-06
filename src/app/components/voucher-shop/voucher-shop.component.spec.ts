import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherShopComponent } from './voucher-shop.component';

describe('VoucherShopComponent', () => {
  let component: VoucherShopComponent;
  let fixture: ComponentFixture<VoucherShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
