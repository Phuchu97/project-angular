import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ShareModule } from 'src/app/shared/share.module';


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ShareModule
  ]
})
export class ForgotPasswordModule { }
