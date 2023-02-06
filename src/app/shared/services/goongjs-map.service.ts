import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RepositoryEloquentService} from "../../services/baserepository.service";
declare const goongjs: any;
@Injectable({
  providedIn: 'root'
})
export class GoongjsMapService extends RepositoryEloquentService{
  public map: any;
  public marker: any;
  public googApiUrl = 'https://rsapi.goong.io';
  private apiLoadMapKey = "MgO7jfiFRiX3pMRTjzPvW38fSIC5zkbGvDcMJDtB";
  private apiServiceKey = "UQ3c01OrDv0zEAiem1a5QOwoM3Z9yWtuj26uFFU8";
  constructor(
    public override httpClient: HttpClient
  ) {
    super();
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.googApiUrl
    })
  }

  public renderMap(element: Element, data: any) {
    goongjs.accessToken = this.apiLoadMapKey;
    this.map = new goongjs.Map({
      container: data && data.id ? data.id.toString() : element, // container id
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
      center: [data.lng, data.lat], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });
    this.setMarker(data.lat, data.lng)
  }

  // @ts-ignore
  public setMarker(lat, lng) {
    this.marker = new goongjs.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  // @ts-ignore
  public getCoordinateByAddress(param: {address: string}) {
    const newparam = {...param, api_key: this.apiServiceKey}
    this.setServiceInfo({
      httpClient: this.httpClient,
      apiUrl: this.googApiUrl + '/geocode'
    });
    return this.get(newparam)
  }
}
