import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VoucherService } from 'src/app/services/voucher.service';
import { VoucherModel } from './../../model/voucher.model';
import { VoucherDialogComponent } from './../voucher-dialog.component';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {

  @ViewChild(VoucherDialogComponent) voucherDialog: VoucherDetailComponent;
  public dataObject: any
  constructor(
    private activeModal: NgbActiveModal,
    private _voucherService: VoucherService,
  ) { }

  ngOnInit(): void {
    let disable = this.dataObject[0].disable;
    this._voucherService.voucherGetByIdUrl(this.dataObject[0].id).subscribe(res => {
      this.dataObject[0] = res.data;
      this.dataObject[0].disable = disable;
    })
  }

  selectedVoucher(voucher: any) {
    let type = this.dataObject[1]?.avatar ? 1 : 2;
    // this.voucherDialog.dbClickITem(voucher, type);
    this.activeModal.close(type);
  }

  public close() {
    this.activeModal.close();
  }

}
