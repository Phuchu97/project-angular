import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanHangDoanhNghiepComponent } from './ban-hang-doanh-nghiep.component';

describe('BanHangDoanhNghiepComponent', () => {
  let component: BanHangDoanhNghiepComponent;
  let fixture: ComponentFixture<BanHangDoanhNghiepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanHangDoanhNghiepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanHangDoanhNghiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
