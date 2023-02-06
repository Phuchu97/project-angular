import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressIoComponent } from './address-io.component';

describe('AddressIoComponent', () => {
  let component: AddressIoComponent;
  let fixture: ComponentFixture<AddressIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressIoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
