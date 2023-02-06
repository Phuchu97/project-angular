import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'censor'
})
export class CensorPipe implements PipeTransform {

  transform(string: unknown, key: string): string {
    if (!string) {
      return "";
    }
    switch (key) {
      case "email":
        return this.sensorEmail(string);
      case "phone":
      default:
        return this.censorWord(string);
    }
  }

  // @ts-ignore
  public censorWord(str) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  }

  // @ts-ignore
  public sensorEmail(email) {
    var arr = email.split("@");
    return this.censorWord(arr[0]) + "@" + this.censorWord(arr[1]);
  }

}
