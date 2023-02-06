import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders,} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {TranslateService} from "@ngx-translate/core";

/**
 * Api url
 * Input model name
 * Output model name
 */
let inputModelName: any;
let outputModelName: any;

@Injectable({
  providedIn: "root",
})

export class RepositoryEloquentService extends Subject<any> {
  // TODO: add explicit constructor

  // @ts-ignore
  public apiUrl: environment.baseUrl;
  public httpClient: HttpClient;
  public headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });


  /**
   * Return query string from object
   * @param obj Object
   * @returns String
   */
  public convertObjectToQueryString(obj: Object) {
    // @ts-ignore
    return Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key]))
      .join("&");
  }

  /**
   * Function set model from child class
   */
  // @ts-ignore
  public setServiceInfo(serviceInfo) {
    this.apiUrl = serviceInfo.apiUrl !== undefined ? serviceInfo.apiUrl : this.apiUrl;
    this.httpClient = serviceInfo.httpClient !== undefined ? serviceInfo.httpClient : this.httpClient;
    inputModelName = serviceInfo.inputModelName !== undefined ? serviceInfo.inputModelName : inputModelName;
    outputModelName = serviceInfo.outputModelName !== undefined ? serviceInfo.outputModelName : outputModelName;
  }

  /**
   * Get all data
   * @returns {Observable}
   */
  // @ts-ignore
  public get(params: any = {}): Observable<typeof outputModelName[]> {
    try {
      let queryString = this.convertObjectToQueryString(params);
      return this.httpClient
        .get<typeof outputModelName[]>(`${this.apiUrl}?${queryString}`, {
          headers: this.headers,
        })
        .pipe(catchError(this.errorHandler));
    } catch (error) {

    }
  }

  /**
   * Fetch all data
   * @returns {Promise}
   */
  // @ts-ignore
  public getByid(id: number): Observable<typeof inputModelName> {
    try {
      return this.httpClient.get<typeof inputModelName>(`${this.apiUrl}\\${id}`, {
        headers: this.headers
      });
    } catch (error) {

    }
  }

  /**
   * Add new item into list data
   * @param {Object} body The data input.
   * @returns {Observable}
   */
  // @ts-ignore
  public post(body: any): Observable<typeof inputModelName> {
    try {
      const options = { headers: this.headers };
      // trim string
      this.trimInputObject(body);
      return this.httpClient.post<typeof inputModelName>(
        this.apiUrl,
        body,
        options
      );
    } catch (error) {

    }
  }

  /**
   * Add new file
   * @param {Object} body The data input.
   * @returns {Observable}
   */
  // @ts-ignore
  public addFile(body: FormData): Observable<typeof inputModelName> {
    return this.httpClient.post(this.apiUrl, body).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
      }),
    )
  }

  /**
   * Update item
   * @param {Any} body Data input.
   * @returns {Observable}
   */
  // @ts-ignore
  public updateItem(body: any): Observable<typeof inputModelName> {
    try {
      // trim string
      this.trimInputObject(body);
      return this.httpClient.put<typeof inputModelName>(this.apiUrl, body, {
        headers: this.headers
      });
    } catch (error) {

    }
  }

  /**
   * Delete item
   * @param {Number} id Item id.
   * @returns {Observable}
   */
  // @ts-ignore
  public delete(params = {}): Observable<any> {
    try {
      let queryString = this.convertObjectToQueryString(params);
      return this.httpClient.delete<any>(`${this.apiUrl}?${queryString}`, {
        headers: this.headers,
      });
    } catch (error) {

    }
  }

  /**
   * Fetch all data
   * @returns {Promise}
   */
  // @ts-ignore
  public getFetchAll(params = {}) {
    try {
      let queryString = this.convertObjectToQueryString(params);
      return this.httpClient.get(`${this.apiUrl}?${queryString}`, {
        headers: this.headers,
      }).toPromise();
    } catch (error) {

    }
  }

  /**
   * Catch error from Observable
   * @param {HttpErrorResponse} error Error.
   */
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }

  /*
  * Trim string of object
  */
  // @ts-ignore
  trimInputObject(obj) {
    Object.keys(obj).map(k => {
      if (obj[k] && (typeof (obj[k]) === 'string')) {
        obj[k] = obj[k].trim();
      }
    });
  }
}
