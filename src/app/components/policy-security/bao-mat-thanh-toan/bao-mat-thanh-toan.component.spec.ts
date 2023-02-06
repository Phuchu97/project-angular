import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoMatThanhToanComponent } from './bao-mat-thanh-toan.component';

describe('BaoMatThanhToanComponent', () => {
  let component: BaoMatThanhToanComponent;
  let fixture: ComponentFixture<BaoMatThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaoMatThanhToanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoMatThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
