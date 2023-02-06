import { Pipe, PipeTransform } from '@angular/core';
import {AliasStringPipe} from "./alias-string.pipe";
import {EncryptPipe} from "./encrypt.pipe";

@Pipe({
  name: 'seoUrl'
})
export class SeoUrlPipe implements PipeTransform {
  constructor(
    public aliasStringPipe: AliasStringPipe,
    public encryptPipe: EncryptPipe
  ) {
  }

  transform(name: string, id: any) {    
    const aliasName = this.aliasStringPipe.transform(name).replace(/ /g,"-");
    const encrypt = this.encryptPipe.transform(id.toString(), "encrypt");
    return `${aliasName}-${encrypt}.html`
  }

}
