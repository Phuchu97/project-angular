import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { ApiStorageConstant } from 'src/app/shared/common/api-storage';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notify-update-smartgap',
  templateUrl: './notify-update-smartgap.component.html',
  styleUrls: ['./notify-update-smartgap.component.css']
})
export class NotifyUpdateSmartgapComponent implements OnInit {
  userId: any;
  data: any;
  pathImg = ApiStorageConstant.fileImageUrl;
  constructor(
    private _notificationService: NotificationService,
    private storeService: StorageService,
  ) {
    this.userId = this.storeService.get('id');
    this.getAllNotifyByUser();
  }

  ngOnInit(): void {
  }

  async getAllNotifyByUser(): Promise<void> {
    const resData: any = await this._notificationService.GetAllNotify({ id: this.userId, page_size: 10 }).toPromise();
    this.data = resData.data.lists;
  }

}
