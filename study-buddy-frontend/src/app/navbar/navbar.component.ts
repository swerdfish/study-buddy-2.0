import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthState } from '../store';
import { AuthState } from '../store/reducers/auth.reducer';
import * as credKey from '../../../../../sheets-cred-key_studyBuddy.json'
import { GoogleLogin, GoogleRegister, GoogleLogout } from '../store/actions/auth.actions';
import * as deckActions from '../store/actions/deck.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  open: boolean;
  openCloseBurgerUsed: boolean;
  isLoggedIn: boolean;
  user: User;
  loading: boolean = false;
  clientId: string;
  getState: Observable<AuthState>;

  @HostListener('document:click')
  clickOut() {
    if (this.openCloseBurgerUsed) {
      this.openCloseBurgerUsed = false;
    } else {
      this.open = false;
    }
  }

  constructor(
    private router: Router,
    private store: Store) {
    this.open = false;
    this.openCloseBurgerUsed = false;
    this.getState = this.store.select(selectAuthState);
    this.clientId = credKey.client_id;
  }

  ngOnInit(): void {
    this.getState.subscribe((state: AuthState) => {
      this.isLoggedIn = Object.keys(state.user).length > 0;
      this.user = state.user;
      this.loading = state.loading;
    })
  }

  openCloseBurger() {
    this.open = !this.open;
    this.openCloseBurgerUsed = true;
  }

  register() {
    this.store.dispatch(new GoogleRegister(null));
  }

  login() {
    this.store.dispatch(new GoogleLogin(null));
  }

  logout() {
    this.store.dispatch(new GoogleLogout(null));
    this.store.dispatch(deckActions.clearAllDecks());
    this.router.navigateByUrl("/home");
  }

}
