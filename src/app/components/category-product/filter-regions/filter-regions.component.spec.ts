import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRegionsComponent } from './filter-regions.component';

describe('FilterRegionsComponent', () => {
  let component: FilterRegionsComponent;
  let fixture: ComponentFixture<FilterRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRegionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
