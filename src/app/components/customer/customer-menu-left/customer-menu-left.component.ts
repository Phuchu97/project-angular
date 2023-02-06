import {Component, OnInit} from '@angular/core';
import {RouterConstants} from "../../../shared/common/router.constants";

declare const toggleMenuCustomer: any;

@Component({
  selector: 'app-customer-menu-left',
  templateUrl: './customer-menu-left.component.html',
  styleUrls: ['./customer-menu-left.component.css']
})
export class CustomerMenuLeftComponent implements OnInit {
  public routerConstants = RouterConstants;
  constructor() {
  }

  expand: boolean = true;
  icon: string = "fa fa-angle-up";

  ngOnInit(): void {
  }

  toggle(e: any) {
    this.expand = !this.expand;
    if (!this.expand) {
      this.icon = "fa fa-angle-down"
    } else this.icon = "fa fa-angle-up"
  }

  toggleMenuCustomerClick(event: Event) {
    toggleMenuCustomer(event);
  }

}
