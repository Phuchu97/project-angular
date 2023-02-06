import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Pipe({
  name: 'encrypt'
})
export class EncryptPipe implements PipeTransform {
  // public secretKey = "smartgap";
  public multi = 10000;
  public radix = 24

  transform(value: any, key: string) {
    switch (key) {
      case "encrypt":
      default:
        // console.log(value, value);
        // const b64 = CryptoJS.AES.encrypt(value, this.secretKey).toString();
        // const e64 = CryptoJS.enc.Base64.parse(b64);
        // return e64.toString(CryptoJS.enc.Hex);
        if (value == 1) {
          return "0x25F1"
        }
        else if (value == 2) {
          return "0x25AD"
        }
        else if (value == 5) {
          return "0x25AF"
        }
        return (this.multi * Number(value)).toString(this.radix);
      case "decrypt":
        // const reb64 = CryptoJS.enc.Hex.parse(value);
        // const bytes = reb64.toString(CryptoJS.enc.Base64);
        // const decrypt = CryptoJS.AES.decrypt(bytes, this.secretKey);
        // return decrypt.toString(CryptoJS.enc.Utf8);
        if (value == "0x25F1") {
          return 1
        }
        else if (value == "0x25AD") {
          return 2
        }
        else if (value == "0x25AF") {
          return 5
        }
        return parseInt(value, this.radix) / this.multi;
    }
  }

}
