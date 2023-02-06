import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { CartService } from './../../../services/cart.service';

class PaymentReturn {
  vnp_Amount: number;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: number;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: number;
  vnp_TxnRef: string;
  vnp_SecureHashType: string;
  vnp_SecureHash: string;
  vnp_TransactionStatus: string;
}

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})

export class PaymentInfoComponent implements OnInit {
  data: PaymentReturn = new PaymentReturn();
  statusPayment = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.data.vnp_Amount = +(params['vnp_Amount']) || 0;
        this.data.vnp_BankCode = params['vnp_BankCode'] || "0";
        this.data.vnp_BankTranNo = params['vnp_BankTranNo'] || "0";
        this.data.vnp_CardType = params['vnp_CardType'] || "0";
        this.data.vnp_OrderInfo = params['vnp_OrderInfo'] || "0";
        this.data.vnp_PayDate = +params['vnp_PayDate'] || 0;
        this.data.vnp_ResponseCode = params['vnp_ResponseCode'] || "0";
        this.data.vnp_TmnCode = params['vnp_TmnCode'] || "0";
        this.data.vnp_TransactionNo = +params['vnp_TransactionNo'] || 0;
        this.data.vnp_TxnRef = params['vnp_TxnRef'] || "0";
        this.data.vnp_SecureHashType = params['vnp_SecureHashType'] || "0";
        this.data.vnp_SecureHash = params['vnp_SecureHash'] || "0";
        if (this.data.vnp_ResponseCode == '00') {
          this.statusPayment = true;
          this.data.vnp_TransactionStatus = this.data.vnp_ResponseCode
          let listCartOrder = JSON.parse(JSON.stringify(localStorage.getItem('listCartOrder')))
          if (!!listCartOrder) {
            listCartOrder = listCartOrder.split(',').map(item => {
              return parseInt(item, 10)
            })
            this.deleteCartItem(listCartOrder).subscribe((res) => {
              localStorage.removeItem("listCartOrder");
            })
          }
        } else {
          this.data.vnp_TransactionStatus = this.data.vnp_ResponseCode
          localStorage.removeItem("listCartOrder");
        }
        this.customerService.getPaymentReturn(this.data).subscribe();
      });
  }

  deleteCartItem(listSelectedCartDetails: number[]): Observable<any> {
    return this.cartService.deleteCartItem(listSelectedCartDetails);
  }

}
