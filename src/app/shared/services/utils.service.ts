import { Injectable } from '@angular/core';
import moment from 'moment';
import {EncryptPipe} from "../pipes/encrypt.pipe";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public encryptPipe: EncryptPipe
  ) { }

  getNowDateString(format?: string) {
    const now = new Date();

    return moment(now).format(format ? format : 'YYYY-MM-DD');
  }

  decimalConvert(value: number) {
    return Math.round(value * 100) / 100;
  }

  getParameterByName(name: string, url?: string) {
    if (!url) { url = window.location.href; }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) { return null; }
    if (!results[2]) { return ''; }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  CheckAccessKeyRole(Str: string, Code: string, index: number) {
    let Arr = [];
    Arr = Str.split('-');
    for (let i = 0; i < Arr.length; i++) {
      const ConvertArr = Arr[i].split(':');
      if (Code == ConvertArr[0]) {
        const check = ConvertArr[1].substr(index, 1);
        if (check == '1') {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  // @ts-ignore
  compactDate(year, month, day) {
    return new Date(year + '-' + month + '-' + (day + 1)).toISOString().slice(0, 10);
  }

  convertDateStart(year: number, month: number, day: number) {
    return year + '-' + month + '-' + day + ' 00:00:00';
  }

  convertDateEnd(year: number, month: number, day: number) {
    return year + '-' + month + '-' + day + ' 23:59:59';
  }

  public getIdBySeoUrl(url: string) {    
    const arr = url.split('-');
    const last = arr.pop();
    const id = last?.split(".").shift();
    const decrypt = this.encryptPipe.transform(id, "decrypt");
    return +decrypt;
  }

}
