import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { FlashcardDeckService } from './flashcard-deck.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [
    GoogleApiService,
    FlashcardDeckService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
