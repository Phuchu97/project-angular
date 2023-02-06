import { Constant, StorageOption } from './../common/app.constants';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';



@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private storageService: StorageService) {}

    public getSessionIdFromCookie(): string {
        this.storageService.initialize(StorageOption.Cookie);
        let sessionId = this.storageService.get(Constant.SessionId);
        if (!sessionId) {
            sessionId = uuid.v4();
            this.storageService.set(Constant.SessionId, sessionId);
        }

        return sessionId;
    }

    public deleteSessionIdFromCookie(): void {
        this.storageService.initialize(StorageOption.Cookie);
        this.storageService.delete(Constant.SessionId);
    }
}
