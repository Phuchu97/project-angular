import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CacheService {
    private pullCacheApiUrl = ''; // url pull cache
    private saveCacheApiUrl = ''; // url save cache
    constructor(private dataService: DataService) {
    }

    pullCache(request: any): Observable<any> {
        return this.dataService.post(this.pullCacheApiUrl, request).pipe(
            catchError(err => {
                return null;
            }), map((res: any) => {
                if (res.IsSuccess) {
                    const cache = res.ResultObj as string;
                    return JSON.parse(cache) as any;
                }
            }));
    }

    saveCache(request: any): Observable<string> {
        return this.dataService.post(this.saveCacheApiUrl, request).pipe(
            catchError(err => {
                return null;
            }), map((res: any) => {
                if (res.IsSuccess) {
                    const cache = res.ResultObj as string;
                    return cache;
                }
            }));
    }
}
