import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  public paymentInfo = {}
  public dataObject: any;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  selectItem(key: string) {
    switch (key) {
      case "COD":
        this.paymentInfo = {
          name: "Thanh toán khi nhận hàng",
          id: 0
        }
        break
      case "VNPay":
        this.paymentInfo = {
          name: "Thanh toán qua VnPay",
          id: 1
        }
        break
      case "VDT":
        this.paymentInfo = {
          name: "Ví điện tử",
          id: 2
        }
        break;
    }
  }

  close() {
    this.activeModal.close();
  }

  confirm() {
    const selectedItem = Object.assign({}, this.paymentInfo)
    this.activeModal.close(selectedItem)
  }
}
