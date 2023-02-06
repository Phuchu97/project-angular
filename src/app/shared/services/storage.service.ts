import { Injectable } from '@angular/core';
import { StorageOption } from '../common/app.constants';
import { IStorageProvider } from '../interfaces/istorage-provider';
import { CookieProvider } from '../providers/cookie.provider';
import { LocalStorageProvider } from '../providers/local-storage.provider';
import {Subject} from "rxjs";

export const StoreName = {
  Cookie: 'Cookie'
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private store: IStorageProvider;
  private _change = new Subject<any>();
  readonly change$ = this._change.asObservable();

  constructor(
    private cookieProvider: CookieProvider,
    private localStorageProvider: LocalStorageProvider
  ) {
    this.store = this.localStorageProvider;
  }

  public initialize(providerName: string): void {
    if (providerName === StorageOption.Cookie) {
        this.store = this.cookieProvider;
    } else {
        this.store = this.localStorageProvider;
    }
  }

  public get(key: string): any {
    return this.store.get(key);
  }

  public set(key: string, model: any): void {
    this.store.set(key, model);
  }

  public delete(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clearAll();
    this._change.next("clearAll");
  }
}
