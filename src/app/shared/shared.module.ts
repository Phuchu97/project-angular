import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { PipeModule } from 'src/app/shared/pipes/pipe.module';



// DIRECTIVES
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { DataTablesModule } from 'angular-datatables';


import { CommonService } from 'src/app/services/common.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { DownloadService } from './services/download.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
    exports: [
        CommonModule,
        ToggleFullscreenDirective,
        SidebarDirective,
        TopMenuDirective,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule,
        NgSelectModule,
        NgxSpinnerModule,
        ToastrModule,
        PaginationModule,
        ModalModule,
        ModalDialogModule,
        TranslateModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule ,
        PerfectScrollbarModule,
        ClickOutsideModule,
        AutocompleteModule,
        PipeModule,
        DataTablesModule,
        NgSelectModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(),
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        ModalDialogModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        })

    ],
    declarations: [
        ToggleFullscreenDirective,
        SidebarLinkDirective,
        SidebarDropdownDirective,
        SidebarAnchorToggleDirective,
        SidebarDirective,
        TopMenuLinkDirective,
        TopMenuDropdownDirective,
        TopMenuAnchorToggleDirective,
        TopMenuDirective,
        CustomCurrencyPipe
    ],
    providers: [
      CommonService,
      DownloadService,
    ]
})
export class SharedModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
