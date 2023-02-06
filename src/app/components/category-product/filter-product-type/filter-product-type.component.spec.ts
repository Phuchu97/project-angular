import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductTypeComponent } from './filter-product-type.component';

describe('FilterProductTypeComponent', () => {
  let component: FilterProductTypeComponent;
  let fixture: ComponentFixture<FilterProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
