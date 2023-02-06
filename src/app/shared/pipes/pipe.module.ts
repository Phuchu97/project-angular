import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { ImageUrlPipe } from './image-url.pipe';
import { CensorPipe } from './censor.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SeoUrlPipe } from './seo-url.pipe';
import { AliasStringPipe } from './alias-string.pipe';
import { EncryptPipe } from './encrypt.pipe';
import { ImageUrlDetailPipe } from './image-url-detail.pipe';

@NgModule({
  declarations: [FilterPipe, SearchPipe, ShortNamePipe, ImageUrlPipe, ImageUrlDetailPipe, CensorPipe, NumberFormatPipe, SafeHtmlPipe, SeoUrlPipe, AliasStringPipe, EncryptPipe],
  imports: [CommonModule],
  exports: [FilterPipe, SearchPipe, ShortNamePipe, ImageUrlPipe, ImageUrlDetailPipe, CensorPipe, NumberFormatPipe, SafeHtmlPipe, SeoUrlPipe, AliasStringPipe, EncryptPipe],
  providers: [DatePipe, NumberFormatPipe, ImageUrlPipe, ImageUrlDetailPipe, SafeHtmlPipe, SeoUrlPipe, AliasStringPipe, EncryptPipe]
})

export class PipeModule {}
