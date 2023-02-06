import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {CustomerFacadeService} from "../service/customer-facade.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifyMessageService} from "../../../shared/services/notify-message.service";
import {AppStatusCode} from "../../../shared/common/app.constants";
import {FileUploadItem, Guid} from "../model/fileupload.model";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public appStatusCode = AppStatusCode;
  public userForm: FormGroup;
  public userInfo: any;
  public userId: number;
  public isShowEmail: boolean;
  public isShowPhone: boolean;
  public fileItemsAvatar: FileUploadItem[] = [];
  public pathAvatar: string;
  public submited = false;
  public maxData = new Date();

  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private formBuilder: FormBuilder,
    private notifyMessageService: NotifyMessageService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.storeService.get('id');
    this.buildForm();
    this.getUserInfo()
  }

  public buildForm() {
    this.userForm = this.formBuilder.group({
      full_name: ["", [Validators.required, Validators.pattern("^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$")]],
      email: ["", [Validators.required, Validators.pattern("^([A-Za-z0-9]|[A-Za-z0-9](([a-zA-Z0-9,\\.\\_]+)*)[a-zA-Z0-9,\\.\\_])@(?:[0-9a-zA-Z-]+\\.)+[a-zA-Z]{2,9}$")]],
      phone: ["", [Validators.required, Validators.pattern("(^[0][3|5|7|8|9])+([0-9]{8})")]],
      sex: [""],
      birtday: ["",[Validators.required]]
    })
  }

  public setValueForm() {
    this.userForm.setValue({
      full_name: this.userInfo.full_name,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      sex: this.userInfo.sex,
      birtday: this.userInfo.birtday ? new Date(this.userInfo.birtday) : ""
    })
  }

  private getUserInfo() {
    this.customerFacadeService.getCustomerUserService().get({id: this.userId}).subscribe((res: any) => {
      this.userInfo = res.data;
      this.setValueForm();
    })
  }

  public save() {
    this.submited = true;
    if (!this.userForm.valid) {
      return;
    }
    this.setValueModel();
    this.customerFacadeService.getCustomerUserService().customerUserModify(this.userInfo).subscribe(res => {
        if (res.statusCode === this.appStatusCode.StatusCode200) {
          this.notifyMessageService.success(res.message)
        } else {
          this.notifyMessageService.error(res.message)
        }
      },
      (err) => this.notifyMessageService.error(err.message));
  }

  private setValueModel() {
    Object.keys(this.userForm.value).forEach((control: any) => {
      this.userInfo[control] = this.userForm.value[control];
    })
  }

  onSelectFile($event: any) {
    if (($event.target.files[0].size / (1024 * 1024)) > 1) {
      this.notifyMessageService.error('File vượt quá dung lượng cho phép!');
      return;
    }
    this.fileItemsAvatar = [];
    let files: FileList = $event.target.files;
    if (files != null) {
      //let temps = []
      for (let i = 0; i < files.length; i++) {
        let isImage = this.checkFileIsImage(files[i].name);
        // @ts-ignore
        const extension = files[i].name.split('.').pop().toLowerCase();
        if (isImage) {
          var reader = new FileReader();
          reader.readAsDataURL($event.target.files[i]); // read file as data url
          reader.onload = ($event) => { // called once readAsDataURL is completed
            let fr = $event.target as FileReader;
            let src = fr.result as string;
            let fileAdd = new FileUploadItem();
            fileAdd.id = 0;
            fileAdd.isAdd = true;
            fileAdd.content = files[i];
            fileAdd.url = src;

            fileAdd.fileName = Guid.newGuid() + '.' + extension;
            fileAdd.fileType = extension;
            fileAdd.hasContent = true;
            this.pathAvatar = src;
            this.fileItemsAvatar.push(fileAdd);
            this.onUploadFileAndModifyAvatar()
          }

        } else {
          this.notifyMessageService.error('File không đúng định dạng quy định, vui lòng chọn lại các file có định dạng: .jpg; .jpeg; .png; .svg;');
          break;
        }
      }
    }
  }

  public getExtension(filename: string) {
    var parts = filename.split('.')
    return parts[parts.length - 1]
  }

  public checkFileIsImage(filename: string) {
    var ext = this.getExtension(filename)
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'svg':
      case 'mp4':
        return true
    }
    return false;
  }

  onUploadFileAndModifyAvatar() {
    const formData: any = new FormData();
    //
    for (const item of this.fileItemsAvatar) {
      if (item.content && item.fileName != '' && item.isAdd) {
        formData.append("data", item.content, item.fileName);
      }
    }
    if (formData && formData.get('data')) {
      this.customerFacadeService.getCustomerUserService().uploadFile(formData).pipe(
        switchMap(fileUpload => this.modifyCustomerAvatar(fileUpload))
      ).subscribe(() => {
        this.notifyMessageService.success('Cập nhập ảnh đại diện thành công!');
      });
    }
  }

  public modifyCustomerAvatar(file: any) {
    const body = {
      ...file.newFiles[0]
    }
    return this.customerFacadeService.getCustomerUserService().modifyCustomerAvatar(body)
  }
}
