import { AppComponentBase } from 'src/app/shared/common/app-base-component';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { RouterConstants } from 'src/app/shared/common/router.constants';
import { environment } from 'src/environments/environment';
declare const myTest: any;
@Component({
  selector: 'header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent extends AppComponentBase implements OnInit {

  constructor(private injector:Injector,private router:Router,
    private languageService:LanguageService
    ) {
    super(injector);
  }
  Toggle:boolean=false;
  languageList:any;
  flagLanguage:string;
  //currentLang =localStorage.getItem("lang");
  currentLang =this.translate.currentLang;
  urlWebShopAdmin:string = environment.baseUrl.webShopAdmin;
  //this.flagLanguage:string=this.currentLang!="en"?"./assets/images/flag_VN.png":"./assets/images/flag_EN.png";
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("lang",language);
    this.Toggle=true?this.Toggle==false:true;
    if(language=="vi") {this.flagLanguage="./assets/img/flags/us.png";}
    else this.flagLanguage="./assets/img/flags/us.png";
    this.router.navigate(["/"]);
  }
  override ngOnInit(): void {
    this.listLanguage();
    this.flagLanguage=this.translate.currentLang!="vi"?"./assets/img/flags/us.png":"./assets/img/flags/vi.png";
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("lang",lang);
    // this.Toggle=true?this.Toggle==false:true;
     if(lang=="vi")
     {
       this.flagLanguage="./assets/img/flags/vi.png";
     }
     else {this.flagLanguage="./assets/img/flags/us.png"};
    //this.router.navigate(["/"]);
    window.location.reload();
  }
  listLanguage(){
    let currentLang =this.translate.currentLang;
    this.languageService.getListLanguage().subscribe(rs=>{
      this.languageList =rs.data.filter((d:any)=>d.code !=currentLang);
    })
    }
  dropDownLanguage() {
   this.Toggle=true?this.Toggle==false:true;
  }
  
}
