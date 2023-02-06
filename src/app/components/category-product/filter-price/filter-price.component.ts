import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent implements OnInit {
  @Output() price = new EventEmitter();
  public priceFrom: any;
  public priceTo: any;

  constructor() { }

  ngOnInit(): void {
  }

  public onFilterClick() {
    if (this.validate()) {
      this.price.emit({priceFrom: this.priceFrom, priceTo: this.priceTo})
    }
  }

  public validate() {
    let validate = true;
    if (this.priceFrom ==undefined && !this.isNumber(this.priceFrom)) {
      validate = false;
    }
    if (this.priceTo==undefined && !this.isNumber(this.priceTo)) {
      validate = false;
    }
    return validate;
  }

  // @ts-ignore
  public isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }
}
