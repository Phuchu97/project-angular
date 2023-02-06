import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTranformComponent } from './filter-tranform.component';

describe('FilterTranformComponent', () => {
  let component: FilterTranformComponent;
  let fixture: ComponentFixture<FilterTranformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTranformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTranformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
