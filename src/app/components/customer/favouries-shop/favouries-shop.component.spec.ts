import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriesShopComponent } from './favouries-shop.component';

describe('FavouriesShopComponent', () => {
  let component: FavouriesShopComponent;
  let fixture: ComponentFixture<FavouriesShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriesShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
