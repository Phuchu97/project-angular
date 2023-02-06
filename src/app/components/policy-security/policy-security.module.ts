import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicySecurityRoutingModule } from './policy-security-routing.module';
import { PolicySecurityComponent } from './policy-security.component';
import { QuyCheHoatDongComponent } from './quy-che-hoat-dong/quy-che-hoat-dong.component';
import { DieuKhoanDichVuComponent } from './dieu-khoan-dich-vu/dieu-khoan-dich-vu.component';
import { ChinhSachVanChuyenComponent } from './chinh-sach-van-chuyen/chinh-sach-van-chuyen.component';
import { GiaiQuyetKhieuNaiComponent } from './giai-quyet-khieu-nai/giai-quyet-khieu-nai.component';
import { ChinhSachDoiTraComponent } from './chinh-sach-doi-tra/chinh-sach-doi-tra.component';
import { HuongDanDatHangComponent } from './huong-dan-dat-hang/huong-dan-dat-hang.component';
import { ChinhSachHangNhapKhauComponent } from './chinh-sach-hang-nhap-khau/chinh-sach-hang-nhap-khau.component';
import { BaoMatThanhToanComponent } from './bao-mat-thanh-toan/bao-mat-thanh-toan.component';
import { BanHangDoanhNghiepComponent } from './ban-hang-doanh-nghiep/ban-hang-doanh-nghiep.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';


@NgModule({
  declarations: [
    PolicySecurityComponent,
    QuyCheHoatDongComponent,
    DieuKhoanDichVuComponent,
    ChinhSachVanChuyenComponent,
    GiaiQuyetKhieuNaiComponent,
    ChinhSachDoiTraComponent,
    HuongDanDatHangComponent,
    ChinhSachHangNhapKhauComponent,
    BaoMatThanhToanComponent,
    BanHangDoanhNghiepComponent,
    GioiThieuComponent
  ],
  imports: [
    CommonModule,
    PolicySecurityRoutingModule
  ]
})
export class PolicySecurityModule { }
