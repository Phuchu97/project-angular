import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CustomAdapterService extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const df = moment(value).format('YYYY-MM-DD');
      const date = df.split(this.DELIMITER);

      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (date) {
      return  date.year + this.DELIMITER
      + (date.month.toString().length === 1 ? '0' + date.month : date.month) + this.DELIMITER
      + (date.day.toString().length === 1 ? '0' + date.day : date.day);
    } else {
      return '';
    }
  }
}
