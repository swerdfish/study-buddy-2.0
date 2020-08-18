import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GapiModule } from './gapi/gapi.module';

import { NavbarComponent } from './navbar/navbar.component';
import { GoogleApiService } from './google-api.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MakeBasicDeckComponent } from './make-basic-deck/make-basic-deck.component';
import { DeckDashboardComponent } from './deck-dashboard/deck-dashboard.component';
import { DeckSlipComponent } from './deck-slip/deck-slip.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    MakeBasicDeckComponent,
    DeckDashboardComponent,
    DeckSlipComponent,
    ViewDeckComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    GapiModule
  ],
  providers: [GoogleApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // /**
  //    * Allows for retrieving singletons using `AppModule.injector.get(MyService)`
  //    * This is good to prevent injecting the service as constructor parameter.
  //    */
  // static injector: Injector;
  // constructor(injector: Injector) {
  //   AppModule.injector = injector;
  // }
}
