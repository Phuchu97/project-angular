import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, ...args: unknown[]): string {
    console.log(value);
    return value.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

}
