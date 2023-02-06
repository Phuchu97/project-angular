import { ToastrModule, ToastrService } from 'ngx-toastr';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { ApolloModule, APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS } from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import {ShareModule} from "./shared/share.module";

import { AppInterceptor } from './shared/interceptors/app.interceptor';
import {AuthGuard} from "./shared/auth/auth-guard.service";
import {AppInitService} from "./services/app-init.service";

export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const defaultUri= 'https://48p1r2roz4.sse.codesandbox.io';
const secondUri = 'http://location.smartgap.vn/category';
const thirdUri = 'http://third.endpoint.io/graphql';

export function createDefaultApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({ uri: defaultUri }),
        cache: new InMemoryCache()
    };
}

export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
    return {
        second: {
            name: 'second',
            link: httpLink.create({ uri: secondUri }),
            cache: new InMemoryCache()
        },
        third: {
            name: 'third',
            link: httpLink.create({ uri: thirdUri }),
            cache: new InMemoryCache()
        }
    };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApolloModule,
    HttpClientModule,
    ShareModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      maxOpened: 1,
      autoDismiss: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      defaultLanguage: 'vi',

    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       //Register the ServiceWorker as soon as the app is stable
       //or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),

  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      deps: [HttpLink],
      useFactory: createDefaultApollo
    },
    {
      provide: APOLLO_NAMED_OPTIONS,
      deps: [HttpLink],
      useFactory: createNamedApollo
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    AuthGuard,
    BsModalService,
    ToastrService,
    AuthService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
