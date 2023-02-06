import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaiQuyetKhieuNaiComponent } from './giai-quyet-khieu-nai.component';

describe('GiaiQuyetKhieuNaiComponent', () => {
  let component: GiaiQuyetKhieuNaiComponent;
  let fixture: ComponentFixture<GiaiQuyetKhieuNaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiaiQuyetKhieuNaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaiQuyetKhieuNaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
