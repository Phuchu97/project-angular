export class FileUploadItem {
  public id: number;
  public fileName: string = '';
  public fileType: string = '';
  public url: string = '';
  public urlVideo: any;
  public content: File;
  public idtable: number;
  public tablename: string;
  public name_guid: string;
  public ipserver: string;
  public type: number;
  public path: string;
  public isAdd: boolean = true;
  public isDeleted: boolean = false;
  public hasContent: boolean = false;
  public format: any;
}

export class FileParam {
  data: any;
  fileName: string;
}

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
