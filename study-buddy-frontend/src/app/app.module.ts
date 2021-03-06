import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar/navbar.component';
import { GoogleApiService } from './google-api.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MakeBasicDeckComponent } from './make-basic-deck/make-basic-deck.component';
import { DeckDashboardComponent } from './deck-dashboard/deck-dashboard.component';
import { DeckSlipComponent } from './deck-slip/deck-slip.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ViewDeckGroupComponent } from './view-deck-group/view-deck-group.component';
import { AbbvTitlePipe } from './abbv-title.pipe';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/effects/auth.effects';
import { FlashcardDeckServiceDeprecated } from './flashcard-deck-deprecated.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserService } from './user.service';
import { ErrorComponent } from './error/error.component';
import { DeckEffects } from './store/effects/deck.effects';

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
    LoginComponent,
    ViewDeckGroupComponent,
    AbbvTitlePipe,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      AuthEffects,
      DeckEffects
    ]),
  ],
  providers: [
    GoogleApiService,
    FlashcardDeckServiceDeprecated,
    UserService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
