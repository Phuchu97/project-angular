import { Component, OnInit } from '@angular/core';
import { Province } from 'src/viewModels/smartGapModels';
import { ProvinceService } from 'src/services/smartGapServices';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {

  provinces: Province[];
  loading = true;
  error: any;
  constructor(private _proviceServices:ProvinceService) {}

  ngOnInit() {
   this. getProvince();
  }

  getProvince(){
    this._proviceServices.getProvince().subscribe((result:any)=>{
      this.provinces = result?.data?.provinceList
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
