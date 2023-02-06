import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smartgap-public';
  name = 'Translation';
  constructor(public translate: TranslateService) {}
  ngOnInit(): void {
    this.translate.addLangs(['vi', 'en']);
    //this.translate.setDefaultLang('vi');
    let lang =localStorage.getItem("lang");
    if(lang !=null)
    {
      this.translate.use(lang);
    }
    else
    {
      localStorage.setItem("lang","vi")
    }
  }
}
