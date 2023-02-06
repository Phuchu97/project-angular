import { Component, OnInit } from '@angular/core';
import {ShippingMethod} from "../model/ship.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-shipping-dialog',
  templateUrl: './shipping-dialog.component.html',
  styleUrls: ['./shipping-dialog.component.scss']
})
export class ShippingDialogComponent implements OnInit {
  public dataObject: any;
  public listShippingMethod: ShippingMethod[] = [];

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.listShippingMethod = this.dataObject;
  }

  close() {
    this.activeModal.close();
  }

  confirm() {
    const selectedItem = this.listShippingMethod.find(x => x.selected);
    this.activeModal.close(selectedItem)
  }

  selectItem(item: ShippingMethod) {
    item.selected = true;
    this.listShippingMethod.forEach(x => {
      if (x.shipping_method !== item.shipping_method) {
        x.selected = false;
      }
    })
  }
}
