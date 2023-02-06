import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) {
  }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Đồng ý',
    btnCancelText: string = 'Hủy',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, {size: dialogSize});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  // @ts-ignore
  public openDialogComponent(component, data?, isInstance?: boolean, size?: string): Promise<any> {
    const modalRef = this.modalService.open(component, {size: size || 'lg', keyboard: true, backdrop: "static"});
    if (data) {
      modalRef.componentInstance.dataObject = data;
      if (isInstance) {
        Object.keys(data).forEach(inject => {
          modalRef.componentInstance[inject] = data[inject];
        })
      }
    }
    return modalRef.result;
  }

}
