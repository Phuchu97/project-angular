import { Injectable } from '@angular/core';
import { Constant } from '../shared/common/app.constants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
	public domainImage = '';

  constructor() { }

  ConvertUrl(str:any) {
    str = str.toLowerCase();
    str = str.replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ"/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    str = str.replace(/[^a-zA-Z0-9 ]/g, '');
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    str = str.replace(/ /g, '-');

    return str;
  }

  CheckAccessKey(Str: string, Code: string) {
    let Arr = [];
    Arr = Str.split('-');
    for (let i = 0; i < Arr.length; i++) {
      const ConvertArr = Arr[i].split(':');
      if (Code == ConvertArr[0]) {
        const check = ConvertArr[1].substr(0, 1);
        if (check == '1') {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  CheckAccessKeyRole(Str: string, Code: string, index: number) {
    let Arr = [];
    Arr = Str.split('-');
    for (let i = 0; i < Arr.length; i++) {
      const ConvertArr = Arr[i].split(':');
      if (Code == ConvertArr[0]) {
        const check = ConvertArr[1].substr(index, 1);
        if (check == '1') {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  ConvertDateTime(obj: Date) {
    return obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate() + ' ' + obj.getHours() + ':' + obj.getMinutes() + ':' + obj.getSeconds();
  }
  ConvertDateQuery(str: string) {
    const string = str.split('T')[0];
    return string.split('-');
  }

  ConvertHourQuery(str: string) {
    const string = str.split('T')[1];
    return string.split(':');
  }

  // Hàm đọc dữ liệu từ dạng cha con html => json truyền vào id của noda cha
  ConvertHtmlToJson(Arr:any, CurrentNode:any, Selector:any, ParentId:any, lct:any) {
    let slt = Selector + ' > ol';
    const ol = CurrentNode.getElementsByTagName('ol');
    if (ol.length > 0) {
      slt = slt + ' > li';
      const li = ol[0].querySelectorAll(slt);
      if (li.length > 0) {
        for (let i = 0; i < li.length; i++) {
          const Id = li[i].getAttribute('data-id');
          const Name = li[i].getAttribute('data-name');
          const PrtId = ParentId;

          Arr.push({ CategoryId: Id, Name: Name, CategoryParentId: PrtId, Location: lct });
          lct++;
          this.ConvertHtmlToJson(Arr, li[i], slt, Id, lct);
        }
      }
    }
  }

  ConvertHtmlToJson2(Arr:any, CurrentNode:any, Selector:any, ParentId:any, lct:any):any[] {
    const result = [];
    let slt = Selector + ' > ol';
    const ol = CurrentNode.getElementsByTagName('ol');
    if (ol.length > 0) {
      slt = slt + ' > li';
      const li = ol[0].querySelectorAll(slt);
      if (li.length > 0) {
        for (let i = 0; i < li.length; i++) {
          const Id = li[i].getAttribute('data-id');
          const Name = li[i].getAttribute('data-name');
          const PrtId = ParentId;

          lct++;
          result.push({ id: Id, Name: Name, CategoryParentId: PrtId, Location: lct, children: this.ConvertHtmlToJson2(Arr, li[i], slt, Id, lct) });
          Arr.push({ CategoryId: Id, Name: Name, CategoryParentId: PrtId, Location: lct });

        }
      }
    }

    return result;
  }

  ValidationDate(date: string) {

    return moment(date, 'DD/MM/YYYY', true).isValid();
  }

  ValidationDate2(date: string) {

    return moment(date, 'YYYY-MM-DD', true).isValid();
  }

  MomentDate(date: string) {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      return moment(date, 'YYYY-MM-DD', true);
    } else {
      return new Date();
    }
  }

  AddYearDate(date: string) {
    if (moment(date, 'YYYY-MM-DD', true).isValid()) {
      return moment(date, 'YYYY-MM-DD', true).add(15, 'year');
    } else {
      return new Date();
    }
  }

  AddDynamicYearDate(date: string, year: number) {
    if (moment(date, 'DD/MM/YYYY', true).isValid()) {
      return moment(date, 'DD/MM/YYYY', true).add(year, 'year');
    } else {
      return new Date();
    }
  }

  // @ts-ignore
  TinhLaiCoupon(NgayDuKienBan_Input, NgayTraLaiGanNhat_Input, Ngay_UNC_Input, TongMenhGia_Input, LaiSuatTP_Input, CoSoTinhLai_Input, KyTraLai_Input) {
    NgayDuKienBan_Input = NgayDuKienBan_Input != undefined ? new Date(NgayDuKienBan_Input).setHours(0, 0, 0, 0) : NgayDuKienBan_Input;
    NgayTraLaiGanNhat_Input = NgayTraLaiGanNhat_Input != undefined ? new Date(NgayTraLaiGanNhat_Input).setHours(0, 0, 0, 0) : NgayTraLaiGanNhat_Input;
    Ngay_UNC_Input = Ngay_UNC_Input != undefined ? new Date(Ngay_UNC_Input).setHours(0, 0, 0, 0) : Ngay_UNC_Input;

    const CurentDate = new Date(new Date().setHours(0, 0, 0, 0));

    const NgayTraLaiGanNhat = NgayTraLaiGanNhat_Input ? NgayTraLaiGanNhat_Input : Ngay_UNC_Input;
    const CoSoTinhLai = CoSoTinhLai_Input == 1 ? 365 : 360;

    // let Ngay1 = NgayDuKienBan_Input != undefined ? new Date(NgayDuKienBan_Input) : new Date();
    const Ngay1 = NgayDuKienBan_Input ? (new Date(NgayDuKienBan_Input).getTime() < CurentDate.getTime() ? CurentDate : NgayDuKienBan_Input) : CurentDate;

    const Ngay2 = new Date(NgayTraLaiGanNhat);

    const SoNgayNamGiu = Math.round(Math.abs(((new Date(Ngay1)).getTime() - Ngay2.getTime()) / (24 * 60 * 60 * 1000)));

    if (SoNgayNamGiu == 0) { return TongMenhGia_Input; }

    const res = SoNgayNamGiu * TongMenhGia_Input * LaiSuatTP_Input / CoSoTinhLai / 100;
    return Math.round(res) + TongMenhGia_Input;
  }

}
