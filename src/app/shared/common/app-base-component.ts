import { ToastrService } from 'ngx-toastr';
import { Component, Injector, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ApiStorageConstant } from "./api-storage";
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
    template: '',
})
export abstract class AppComponentBase implements OnInit, OnDestroy {
    public translate: TranslateService;
    public imageUrlBase = environment.baseUrl.apiCommonUrl + ApiStorageConstant.compressedImageUrl;
    lang:string;
    public toast:ToastrService;
    public spinnerLoader: NgxSpinnerService;
    constructor(
        injector: Injector
    ) {
        this.translate = injector.get(TranslateService);
        this.translate.addLangs(['vi', 'en']);
        this.lang =localStorage.getItem('lang') || '{}';
        this.translate.setDefaultLang(this.lang);
         const browserLang = this.translate.getBrowserLang();
         this.translate.use( this.lang);
         this.toast =injector.get(ToastrService);
         this.spinnerLoader = injector.get(NgxSpinnerService);
    }
    ngOnInit() {

    }
    ngOnDestroy(): void {

    }


}
