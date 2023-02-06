import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: string | undefined, key?: string): unknown {
    if (!value) {
      return;
    }
    value = value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    switch (key) {
      case "resourceUrl":
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case "script":
        return this.sanitizer.bypassSecurityTrustScript(value);
      case "style":
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case "url":
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case "string":
      default:
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }

}
