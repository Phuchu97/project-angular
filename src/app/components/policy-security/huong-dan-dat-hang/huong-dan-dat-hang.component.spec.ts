import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuongDanDatHangComponent } from './huong-dan-dat-hang.component';

describe('HuongDanDatHangComponent', () => {
  let component: HuongDanDatHangComponent;
  let fixture: ComponentFixture<HuongDanDatHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuongDanDatHangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuongDanDatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
