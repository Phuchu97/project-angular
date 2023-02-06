import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import {ApiStorageConstant} from "../common/api-storage";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  public imageUrlBase =environment.baseUrl.apiCommonUrl+ ApiStorageConstant.compressedImageUrl;
 // public imageUrlDetail =environment.baseUrl.apiCommonUrl+ ApiStorageConstant.fileImageUrl;
  public noImageUrl = "./assets/images/noimage.png"
  transform(file: any) {
    if (file) {
      const type = typeof (file);
      switch (type) {
        case "string":
          return `${this.imageUrlBase}${file}`;
        case "object":
          if (Array.isArray(file)) {
            return `${this.imageUrlBase}${file[0].path}`
          } else {
            return `${this.imageUrlBase}${file.path}`;
          }
        default:
          return `${this.imageUrlBase}${file.path}`;
      }
    } else {
      return this.noImageUrl;
    }
  }
  
}
