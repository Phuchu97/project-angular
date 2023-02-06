import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyMessageService {

  constructor(
    private toastr: ToastrService,
  ) { }

  warning(msg:any): void {
    this.toastr.warning(msg, 'Cảnh báo');
  }

  success(msg:any): void {
    this.toastr.success(msg, 'Hoàn thành');
  }

  error(msg:any): void {
    this.toastr.error(msg, 'Lỗi');
  }
}
