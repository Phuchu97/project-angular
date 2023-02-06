import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriesProductComponent } from './favouries-product.component';

describe('FavouriesProductComponent', () => {
  let component: FavouriesProductComponent;
  let fixture: ComponentFixture<FavouriesProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriesProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
