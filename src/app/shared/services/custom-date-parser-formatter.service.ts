import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CustomDateParserFormatterService extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);

      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (date) {

      return (date.day.toString().length === 1 ? '0' + date.day : date.day) + this.DELIMITER
      + (date.month.toString().length === 1 ? '0' + date.month : date.month) + this.DELIMITER
      + date.year;
    } else {
      return '';
    }
  }
}
