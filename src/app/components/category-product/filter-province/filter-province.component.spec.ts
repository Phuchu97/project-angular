import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProvinceComponent } from './filter-province.component';

describe('FilterProvinceComponent', () => {
  let component: FilterProvinceComponent;
  let fixture: ComponentFixture<FilterProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
