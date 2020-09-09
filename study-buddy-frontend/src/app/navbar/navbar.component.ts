import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { GoogleApiService } from '../google-api.service';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { selectAuthState } from '../store';
import { AuthState } from '../store/reducers/auth.reducer';
import * as credKey from '../../../../../sheets-cred-key_studyBuddy.json'

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

  // @HostListener('click')
  // clickIn() {
  //   if (!this.openCloseBurgerUsed) {
  //     this.open = true;
  //     console.log("clickIn open=" + this.open);
  //     this.clickInUsed = true;
  //   }
  // }

  @HostListener('document:click')
  clickOut() {
    if (this.openCloseBurgerUsed) {
      this.openCloseBurgerUsed = false;
    } else {
      this.open = false;
      // console.log("clickOut open=" + this.open);
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private gserv: GoogleApiService,
    private store: Store,
    private userv: UserService) {
    this.open = false;
    this.openCloseBurgerUsed = false;
    this.getState = this.store.select(selectAuthState);
    this.clientId = credKey.client_id;
  }

  ngOnInit(): void {
    // this.gserv.getGoogleAuthInstance().subscribe(authInst => {
    //   this.isGoogleAuthed = authInst.isSignedIn.get();
    //   if (this.isGoogleAuthed) {
    //     let profile = authInst.currentUser.get().getBasicProfile();
    //     this.user = {
    //       uid: "0",
    //       email: profile.getEmail(),
    //       firstName: profile.getGivenName(),
    //       lastName: profile.getFamilyName()
    //     };
    //     console.log(authInst.currentUser.get().getAuthResponse().id_token);
    //     this.store.dispatch(new GoogleLoginSuccess({ user: this.user }))
    //   }
    //   this.loading = false;
    //   this.cdr.detectChanges();
    // });
    // this.gserv.getGoogleAuthInstance().pipe(
    //   switchMap(authInst => {
    //     this.isGoogleAuthed = authInst.isSignedIn.get();
    //     if (this.isGoogleAuthed) {
    //       let idToken = authInst.currentUser.get().getAuthResponse().id_token;
    //       console.log(idToken);
    //       return this.userv.loginGoogleUser(idToken);
    //     } else {
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //       return NEVER;
    //     }
    //   }),
    //   catchError(() => {
    //     this.isLoggedIn = false;
    //     this.loading = false;
    //     this.cdr.detectChanges();
    //     return NEVER;
    //   })
    // ).subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     this.store.dispatch(new GoogleLoginSuccess({ user: this.user }));
    //     this.loading = false;
    //     this.isLoggedIn = true;
    //     this.cdr.detectChanges();
    //   }
    // });
    this.getState.subscribe((state: AuthState) => {
      this.isLoggedIn = !!(state.user);
      this.user = state.user;
    })
  }

  openCloseBurger() {
    this.open = !this.open;
    // console.log("openCloseBurger open=" + this.open);
    this.openCloseBurgerUsed = true;
  }

}
