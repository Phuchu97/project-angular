import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [
  {
    path:'',
    component:OrderComponent
  },
  // {
  //   path:'payment/VnPayIPN?vnp_Amount=:vnp_Amount&vnp_BankCode=:vnp_BankCode&vnp_BankTranNo=:vnp_BankTranNo&vnp_CardType=:vnp_CardType&vnp_OrderInfo=:vnp_OrderInfo&vnp_PayDate=:vnp_PayDate&vnp_ResponseCode=:vnp_ResponseCode&vnp_TmnCode=:vnp_TmnCode&vnp_TransactionNo=:vnp_TransactionNo&vnp_TxnRef=:vnp_TxnRef&vnp_SecureHashType=:vnp_SecureHashType&vnp_SecureHash=:vnp_SecureHash',
  //   component:PaymentInfoComponent
  // },
  {
    path:'payment/VnPayIPN',
    component:PaymentInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
