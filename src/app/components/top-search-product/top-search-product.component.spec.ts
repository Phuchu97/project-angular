import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchProductComponent } from './top-search-product.component';

describe('TopSearchProductComponent', () => {
  let component: TopSearchProductComponent;
  let fixture: ComponentFixture<TopSearchProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSearchProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
