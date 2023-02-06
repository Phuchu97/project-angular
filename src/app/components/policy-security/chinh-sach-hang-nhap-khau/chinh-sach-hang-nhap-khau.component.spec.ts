import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSachHangNhapKhauComponent } from './chinh-sach-hang-nhap-khau.component';

describe('ChinhSachHangNhapKhauComponent', () => {
  let component: ChinhSachHangNhapKhauComponent;
  let fixture: ComponentFixture<ChinhSachHangNhapKhauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChinhSachHangNhapKhauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinhSachHangNhapKhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
