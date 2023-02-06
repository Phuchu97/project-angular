import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../shared/services/storage.service";
import {CustomerFacadeService} from "../../service/customer-facade.service";
import {AddressModel} from "../../model/address.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CommonFacadeService} from "../../../../services/common-facade.service";
import {TranslateService} from "@ngx-translate/core";
import {NotifyMessageService} from "../../../../shared/services/notify-message.service";
import {AppStatusCode} from "../../../../shared/common/app.constants";
import {DialogService} from "../../../../shared/services/dialog.service";
import {MapViewComponent} from "../../../../shared/components/map-view/map-view.component";

@Component({
  selector: 'app-address-io',
  templateUrl: './address-io.component.html',
  styleUrls: ['./address-io.component.css']
})
export class AddressIoComponent implements OnInit {
  @Input() dataObject: AddressModel;
  public appStatusCode = AppStatusCode;
  public form: FormGroup;
  public userId: number;
  public isConfirmpassword = false;
  public dataModel: AddressModel;
  public language: string;
  public listProvince: any = [];
  public listDistrict: any = [];
  public listWard: any = [];
  public onSubmited: boolean = false;
 
  public errorMessege = {
    address : {
      required: "Vui lòng nhập địa chỉ!"
    },
    receiver : {
      required: "Vui lòng nhập người nhận!"
    },
    province_id: {
      required: "Vui lòng chọn tỉnh!"
    },
    district_id: {
      required: "Vui lòng chọn huyện!"
    },
    ward_id: {
      required: "Vui lòng chọn xã!"
    },
    latlong: {
      required: "Vui lòng chọn vị trí!"
    },
    phone: {
      required: "Vui lòng nhập số điện thoại!",
      pattern: "Số điện thoại không đúng định dạng"
    }
  }
  public selectCoords: {
    lat: string,
    lng: string
  };

  constructor(
    private storeService: StorageService,
    private customerFacadeService: CustomerFacadeService,
    private commonFacadeService: CommonFacadeService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private notifyMessageService: NotifyMessageService,
    private dialogService: DialogService,
    private activeModal: NgbActiveModal
  ) 
  {
    this.language = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.getProvince();
    this.buildForm();
    if (this.dataObject && this.dataObject.id) {
      this.getAddressInfo();
    }
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      address: ["", [Validators.required]],
      receiver: ["", [Validators.required]],
      province_id: ["", [Validators.required]],
      province_name: [""],
      district_id: ["", [Validators.required]],
      district_name: [""],
      ward_id: ["", [Validators.required]],
      ward_name: [""],
      latlong: ["", [Validators.required]],
      lat: [""],
      lng: [""],
      is_default: [false],
      phone: ["", [Validators.required, Validators.pattern("(^[0[3|5|7|8|9])+([0-9]{9})")]],
    })
  }

  public getAddressInfo() {
    this.customerFacadeService.getCustomerUserService().customerAddress({id: this.dataObject.id}).subscribe( (res: any) => {
      this.dataModel = res.data;
      this.selectCoords = { lng: res.data.lng, lat: res.data.lat };
      this.setValueForm();
    });
  }

  public setValueForm() {
    this.form.setValue({
      address: this.dataModel.address,
      receiver: this.dataModel.receiver,
      province_id: this.dataModel.province_id,
      province_name: this.dataModel.province_name,
      district_id: this.dataModel.district_id,
      district_name: this.dataModel.district_name,
      ward_id: this.dataModel.ward_id,
      ward_name: this.dataModel.ward_name,
      is_default: this.dataModel.is_default,
      phone: this.dataModel.phone,
      lat: this.dataModel.lat,
      lng: this.dataModel.lng,
      latlong: this.dataModel.lat && this.dataModel.lng ? `${this.dataModel.lng},${this.dataModel.lat}` : ""
    });
    this.getDistrict();
    this.getWard();
  }

  public getProvince() {
    const param = {
      language_code: this.language
    }
    this.commonFacadeService.categoryService().getCategoryProvince(param).subscribe( (res: any) => {
      this.listProvince = res.data;
    })
  }

  // @ts-ignore
  public getDistrict(event?) {
    if (!this.form.value.province_id) {
      return;
    }
    if (event) {
      this.form.controls['province_name'].setValue(event.city);
      this.form.controls['district_name'].setValue("");
      this.form.controls['district_id'].setValue("");
    }
    if (!this.dataObject || !this.dataObject.id) {
      this.form.controls['district_name'].setValue("");
      this.form.controls['district_id'].setValue("");
    }
    const param = {
      language_code: this.language,
      province_id: this.form.value.province_id
    }
    this.commonFacadeService.categoryService().getCategoryDistrictbyProvince(param).subscribe( (res: any) => {
      this.listDistrict = res.data;
    })
  }

  // @ts-ignore
  public getWard(event?) {
    if (!this.form.value.district_id) {
      return;
    }
    if (event) {
      this.form.controls['district_name'].setValue(event.name);
      this.form.controls['ward_name'].setValue("");
      this.form.controls['ward_id'].setValue("");
    }
    if (!this.dataObject || !this.dataObject.id) {
      this.form.controls['ward_name'].setValue("");
      this.form.controls['ward_id'].setValue("");
    }
    const param = {
      language_code: this.language,
      district_id: this.form.value.district_id
    }
    this.commonFacadeService.categoryService().getCategoryWardByDistrict(param).subscribe( (res: any) => {
      this.listWard = res.data;
    })
  }

  public save() {
    this.onSubmited = true;
    if (!this.validate()) {
      return;
    }
    let body: AddressModel;
    if (this.dataObject && this.dataObject.id) {
      body = this.setValueModel();
      this.customerFacadeService.getCustomerUserService().customerUserAddressModify(body).subscribe(res => {
        this.handleResponse(res);
      });
    } else {
      body = this.form.value;
      body.customer_id = this.dataObject.customer_id;
      this.customerFacadeService.getCustomerUserService().customerUserAddressCreate(body).subscribe( res => {
        this.handleResponse(res);
      })
    }
  }

  // @ts-ignore
  public handleResponse(res) {
    if (res.statusCode === this.appStatusCode.StatusCode200) {
      this.accept();
      this.notifyMessageService.success(res.message);
    } else {
      this.decline();
      this.notifyMessageService.error(res.message)
    }
  }

  private setValueModel() {
    let model: any = this.dataModel;
    Object.keys(this.form.value).forEach(control => {
      model[control] = this.form.value[control];
    })
    return model;
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public clearSelect() {
    if (!this.form.value.province_id) {
      this.listDistrict = [];
      this.listWard = [];
      this.form.controls['ward_id'].setValue("");
      this.form.controls['district_id'].setValue("");
      this.form.controls['province_name'].setValue("");
      this.form.controls['ward_name'].setValue("");
      this.form.controls['district_name'].setValue("");
    } else if (!this.form.value.district_id) {
        this.listWard = [];
        this.form.controls['ward_id'].setValue("");
        this.form.controls['ward_name'].setValue("");
        this.form.controls['district_name'].setValue("");
      } else {
      this.form.controls['ward_name'].setValue("");
    }
  }

  public changeWard(event: any) {
    if (event) {
      this.form.controls['ward_name'].setValue(event.name);
    }
  }

  public validate() {
    return this.form.valid;
  }

  selectMap() {
    const addressString = `${this.form.value.address},${this.form.value.ward_name},${this.form.value.district_name},${this.form.value.province_name}`;
    let dataModel: any = {
      addressIO: true,
      addressString: addressString.replace(/,/g, "") ? addressString : ""
    };
    if (this.dataModel && this.dataModel.lng && this.dataModel.lat) {
      dataModel.coordinate = {
        lng: this.dataModel.lng,
        lat: this.dataModel.lat,
      }
    } else {
      dataModel.coordinate = undefined
    }
    this.dialogService.openDialogComponent(MapViewComponent, dataModel).then(res => {
      if (res) {
        this.form.controls['latlong'].setValue(`${res.lng},${res.lat}`);
        this.form.controls['lat'].setValue(`${res.lat}`);
        this.form.controls['lng'].setValue(`${res.lng}`);
      }
    })

  }
}
