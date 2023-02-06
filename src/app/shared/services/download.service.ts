import { Injectable } from '@angular/core';
import { getFileNameFromResponseContentDisposition, saveFile } from '../helpers/file-download-helper';
import { DataService } from './data.service';
import {environment} from "../../../environments/environment";

@Injectable()
export class DownloadService {

  public baseUrl = environment.baseUrl;
  constructor(
    private dataService: DataService,
  ) { }

  // download file từ bảng Attachment
  downloadFile(id: any) {
    const url = this.baseUrl.apiUrl + '/download/downloadAttachment/' + id;

    // Process the file downloaded
    this.dataService.get(url).subscribe(res => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      console.log(fileName);
      saveFile(res, fileName);
    });
  }

  // download file tử bảng CustomerFiles
  downloadCustomerFiles(id: any) {
    const url = this.baseUrl.apiUrl  + '/download/downloadCustomerFiles/' + id;


    // Process the file downloaded
    this.dataService.get(url).subscribe(res => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      saveFile(res, fileName);
    });
  }

  // download file đính kèm
  downloadFileOther(str: string) {
    const url = this.baseUrl.apiUrl  + '/download/downloadFileOther';

    const obj = { Url: str };

    this.dataService.post(url, obj ).subscribe(res => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      saveFile(res, fileName);
    });
  }

  downloadAttachmentItems(id: any) {
    const url = this.baseUrl.apiUrl  + '/download/downloadAttachmentItem/' + id;

    // Process the file downloaded
    this.dataService.get(url).subscribe(res => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      saveFile(res, fileName);
    });
  }
}



