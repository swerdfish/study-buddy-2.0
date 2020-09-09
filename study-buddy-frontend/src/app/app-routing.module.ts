import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MakeBasicDeckComponent } from './make-basic-deck/make-basic-deck.component';
import { DeckDashboardComponent } from './deck-dashboard/deck-dashboard.component';
import { ViewDeckComponent } from './view-deck/view-deck.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ViewDeckGroupComponent } from './view-deck-group/view-deck-group.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'basic-deck', component: MakeBasicDeckComponent },
  { path: 'dashboard', component: DeckDashboardComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'view', component: ViewDeckComponent },
  { path: 'view-group', component: ViewDeckGroupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
