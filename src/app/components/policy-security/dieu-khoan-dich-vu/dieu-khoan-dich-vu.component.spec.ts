import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuKhoanDichVuComponent } from './dieu-khoan-dich-vu.component';

describe('DieuKhoanDichVuComponent', () => {
  let component: DieuKhoanDichVuComponent;
  let fixture: ComponentFixture<DieuKhoanDichVuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieuKhoanDichVuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuKhoanDichVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
