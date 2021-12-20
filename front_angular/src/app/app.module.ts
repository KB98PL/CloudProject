import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';
import {AlertModule} from './_helpers/_alert/alert.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { JwPaginationModule } from 'jw-angular-pagination';
import { UserIdleModule } from 'angular-user-idle';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminPanelModule } from './adminpanel/adminpanel.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxGoogleAnalyticsModule.forRoot('G-SKRP3PYK9K'),
    NgxGoogleAnalyticsRouterModule,
    HttpClientModule,
    AlertModule,
    MatDialogModule,
    JwPaginationModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    AdminPanelModule,
    BrowserAnimationsModule,
    UserIdleModule.forRoot({idle: 600, timeout: 300, ping: 120}),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}