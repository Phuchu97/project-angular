import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEvaluateComponent } from './filter-evaluate.component';

describe('FilterEvaluateComponent', () => {
  let component: FilterEvaluateComponent;
  let fixture: ComponentFixture<FilterEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterEvaluateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
