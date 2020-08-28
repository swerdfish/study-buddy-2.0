import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { GoogleApiService } from '../google-api.service';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { GoogleLoginSuccess } from '../store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  open: boolean;
  openCloseBurgerUsed: boolean;
  isGoogleAuthed: boolean;
  user: User;
  loading: boolean = true;

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

  constructor(private cdr: ChangeDetectorRef, private gserv: GoogleApiService, private store: Store) {
    this.open = false;
    this.openCloseBurgerUsed = false;
  }

  ngOnInit(): void {
    this.gserv.getGoogleAuthInstance().subscribe(authInst => {
      this.isGoogleAuthed = authInst.isSignedIn.get();
      if (this.isGoogleAuthed) {
        let profile = authInst.currentUser.get().getBasicProfile();
        this.user = {
          uid: "0",
          email: profile.getEmail(),
          firstName: profile.getGivenName(),
          lastName: profile.getFamilyName()
        };
        this.store.dispatch(new GoogleLoginSuccess({ user: this.user }))
      }
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  openCloseBurger() {
    this.open = !this.open;
    // console.log("openCloseBurger open=" + this.open);
    this.openCloseBurgerUsed = true;
  }

  setGoogleAuth(isGoogleAuthed: boolean) {
    this.isGoogleAuthed = isGoogleAuthed;
  }

}
