import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDiscountComponent } from './shop-discount.component';

describe('ShopDiscountComponent', () => {
  let component: ShopDiscountComponent;
  let fixture: ComponentFixture<ShopDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
