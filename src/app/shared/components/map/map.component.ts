import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {GoongjsMapService} from "../../services/goongjs-map.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {
  @Input() address = "";
  @Input() latlng = {lng: '105.83140708984524', lat: '21.022452089739573'};
  @Output() coordinate: EventEmitter<any> = new EventEmitter<any>();
  public dataObject: any;
  constructor(
    public goongjsMapService: GoongjsMapService,
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnChanges() {
    if (this.address) {
      this.goongjsMapService.getCoordinateByAddress({address: this.address}).subscribe((res: any) => {
        if (res.results.length > 0) {
          const location: any = res.results[0];
          this.latlng = {
            lng: location.geometry.location.lng,
            lat: location.geometry.location.lat
          }
          this.renderMap();
          this.coordinate.emit(this.latlng);
        }
      }, () => {
        this.renderMap();
      })
    }
  }

  public renderMap() {
    const element = document.getElementById("map");
    // @ts-ignore
    setTimeout(() => this.goongjsMapService.renderMap(element, this.latlng));
  }

}
