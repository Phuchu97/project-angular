import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-regis-shop-layout',
  templateUrl: './regis-shop-layout.component.html',
  styleUrls: ['./regis-shop-layout.component.css']
})
export class RegisShopLayoutComponent implements OnInit {
  flagLanguage:string;
  languageList:any;
  constructor(public translate: TranslateService,
    private languageService:LanguageService) { }

  ngOnInit(): void {
    this.listLanguage();
    this.flagLanguage=this.translate.currentLang!="vi"?"./assets/img/flags/us.png":"./assets/img/flags/vi.png";
  }
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem("lang",lang);
     if(lang=="vi")
     {
       this.flagLanguage="./assets/img/flags/vi.png";
     }
     else {this.flagLanguage="./assets/img/flags/us.png"};
    window.location.reload();
  }
  listLanguage(){
  let currentLang =this.translate.currentLang;
  this.languageService.getListLanguage().subscribe(rs=>{
    this.languageList =rs.data.filter((d: { code: string; })=>d.code !=currentLang);
  })
  }
}
