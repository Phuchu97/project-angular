import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyCheHoatDongComponent } from './quy-che-hoat-dong.component';

describe('QuyCheHoatDongComponent', () => {
  let component: QuyCheHoatDongComponent;
  let fixture: ComponentFixture<QuyCheHoatDongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuyCheHoatDongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyCheHoatDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
