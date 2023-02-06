import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MapsAPILoader } from '@agm/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShopAddressModel} from "../../../components/shops/model/shop-address.model";
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements OnInit {
  @ViewChild('SelectMapModal', { static: false }) modal: ModalDirective;
  @ViewChild('htmliFrameElement', { static: true }) htmliFrameElement: HTMLIFrameElement;
  @Output() coordinate: EventEmitter<any> = new EventEmitter<any>();
  @Input() public latlngInput: any;
  @Input() public isShowButton = true;
  @Input() public addressInfo: ShopAddressModel;
  public active = false;
  public saving = false;
  public lat = "21.030887";
  public lng = "105.836565";
  public selectCoords: any;
  public dataObject: any;
  public addressIO: boolean;
  public idIframe = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  public addressString = "";
  constructor(
    public mapsAPILoader: MapsAPILoader,
    private activeModal: NgbActiveModal,
  ) {

  }

  ngOnInit(): void {
    if (this.dataObject) {
      if (this.dataObject.coordinate) {
        this.selectCoords = JSON.stringify(this.dataObject.coordinate);
      }
      this.addressIO = this.dataObject.addressIO || false;
      if (this.dataObject.addressString) {
        this.addressString = this.dataObject.addressString;
      }
    }

    if (this.addressInfo) {
      const latlng = {lng: this.addressInfo.lng, lat: this.addressInfo.lat}
      this.selectCoords = JSON.stringify(latlng);
    }
    this.mapsAPILoader.load().then(() => {
      // @ts-ignore
    });
  }

  onClick(): void {
    // this.coordinate.emit(JSON.parse(this.selectCoords));
    this.activeModal.close(JSON.parse(this.selectCoords));
  }

  close(): void {
    this.active = false;
    this.activeModal.close(false);
  }

  onMapClicked(event: any) {
    this.selectCoords = event.coords;
    this.lat = event.coords.lat;
    this.lng= event.coords.lng;
  }

  setCoordinate($event: any) {
    this.selectCoords = JSON.stringify($event);
  }
}
