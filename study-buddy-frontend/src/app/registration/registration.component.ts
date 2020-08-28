import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import * as credKey from '../../../../../sheets-cred-key_studyBuddy.json'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../store';
import { User } from '../model/user.model';
import { GoogleLoginSuccess } from '../store/actions/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit {

  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confPassword: string;
  clientId: string;
  user: User;
  getState: Observable<any>;
  isAuthed: boolean;
  isLoading: boolean = true;

  constructor(private store: Store, private chDet: ChangeDetectorRef) {
    this.clientId = credKey.client_id;
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.isLoading = true;
    let self = this;
    this.getState.subscribe(state => {
      console.log(state);
      self.isAuthed = state.isGoogleAuthed;
      self.user = state.user;
      console.log(self.isAuthed);
      self.isLoading = self.isAuthed;
    });
    console.log(this.isAuthed);
    console.log(this.isLoading);
  }

  ngAfterViewInit(): void {
    if (!this.isAuthed) {
      let self = this;
      gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: (googleUser?) => {
          if (googleUser) {
            console.log(googleUser);
            let profile = googleUser.getBasicProfile();
            if (!self.isAuthed) {
              console.log(self.isAuthed);
              self.store.dispatch(new GoogleLoginSuccess({
                user: {
                  uid: "",
                  firstName: profile.getGivenName(),
                  lastName: profile.getFamilyName(),
                  email: profile.getEmail()
                }
              }));
            }
            self.isLoading = false;
            self.chDet.detectChanges();
          }
        },
        onfailure: () => {
          self.isLoading = false;
          self.chDet.detectChanges();
        },
      });
    }
  }

  register(googleUser?): void {
    if (googleUser) {
      // let profile = googleUser.getBasicProfile();
      // let nameArray = profile.getName().split(" ");
      // this.firstName = profile.getGivenName();//nameArray[0];
      // this.lastName = profile.getFamilyName();//nameArray[nameArray.length-1];
      // this.email = profile.getEmail();
    }
    // console.log("First Name: " + this.firstName);
    // console.log("Last Name: " + this.lastName);
    // console.log("Email: " + this.email);
    // this.userInfo = googleUser.getBasicProfile();
  }

  onFailure(error): void {
    console.log(error);
    this.isLoading = false;
  }

}
