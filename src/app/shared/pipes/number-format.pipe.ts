import { Pipe, PipeTransform } from '@angular/core';
import {isNumeric} from "rxjs/internal-compatibility";

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: unknown) {
    if (value) {
      if (typeof value === 'number') {
        if (value < 0) {
          return 0
        } else {
          return value.toLocaleString('de-DE');
        }
      } else if (isNumeric(value)) {
        if (Number(value) < 0) {
          return 0;
        } else {
          return Number(value).toLocaleString('de-DE');
        }
      }
    } else {
      return value;
    }
  }

}
