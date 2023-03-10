import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDialogComponent } from './voucher-dialog.component';

describe('VoucherDialogComponent', () => {
  let component: VoucherDialogComponent;
  let fixture: ComponentFixture<VoucherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
