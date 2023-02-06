import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/services/smartGapServices';
import { ExchangeRate } from 'src/viewModels/smartGapModels';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  rates: ExchangeRate[];
  loading = true;
  error: any;
  constructor(private _exchangeServices:ExchangeService) {}

  ngOnInit() {
   this.getExchangeRates();
  }

  getExchangeRates(){
    this._exchangeServices.getExchangeRates().subscribe((result:any)=>{
      this.rates = result?.data?.rates
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
