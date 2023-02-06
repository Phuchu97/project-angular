import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NganluongComponent } from './nganluong.component';

describe('NganluongComponent', () => {
  let component: NganluongComponent;
  let fixture: ComponentFixture<NganluongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NganluongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NganluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
