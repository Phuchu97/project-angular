import { PolicySecurityComponent } from './policy-security.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuyCheHoatDongComponent } from './quy-che-hoat-dong/quy-che-hoat-dong.component';
import { DieuKhoanDichVuComponent } from './dieu-khoan-dich-vu/dieu-khoan-dich-vu.component';
import { ChinhSachVanChuyenComponent } from './chinh-sach-van-chuyen/chinh-sach-van-chuyen.component';
import { GiaiQuyetKhieuNaiComponent } from './giai-quyet-khieu-nai/giai-quyet-khieu-nai.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';
import { BanHangDoanhNghiepComponent } from './ban-hang-doanh-nghiep/ban-hang-doanh-nghiep.component';
import { BaoMatThanhToanComponent } from './bao-mat-thanh-toan/bao-mat-thanh-toan.component';
import { ChinhSachDoiTraComponent } from './chinh-sach-doi-tra/chinh-sach-doi-tra.component';
import { ChinhSachHangNhapKhauComponent } from './chinh-sach-hang-nhap-khau/chinh-sach-hang-nhap-khau.component';
import { HuongDanDatHangComponent } from './huong-dan-dat-hang/huong-dan-dat-hang.component';

const routes: Routes = [
  {path:'',redirectTo:'chinh-sach-bao-mat',pathMatch:'full'},
  {
    path:'chinh-sach-bao-mat',
    component:PolicySecurityComponent
  },
  {
    path:'quy-che-hoat-dong',
    component:QuyCheHoatDongComponent
  },
  {
    path:'dieu-khoan-dich-vu',
    component:DieuKhoanDichVuComponent
  }
  ,
  {
    path:'chinh-sach-van-chuyen',
    component:ChinhSachVanChuyenComponent
  },
  {
    path:'giai-quyet-khieu-nai',
    component:GiaiQuyetKhieuNaiComponent
  },
  {
    path:'gioi-thieu',
    component:GioiThieuComponent
  },
  {
    path:'ban-hang-doanh-nghiep',
    component:BanHangDoanhNghiepComponent
  },
  {
    path:'bao-mat-thanh-toan',
    component:BaoMatThanhToanComponent
  },
  {
    path:'chinh-sach-doi-tra',
    component:ChinhSachDoiTraComponent
  },
  {
    path:'chinh-sach-hang-nhap-khau',
    component:ChinhSachHangNhapKhauComponent
  },
  {
    path:'huong-dan-dat-hang',
    component:HuongDanDatHangComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicySecurityRoutingModule { }
