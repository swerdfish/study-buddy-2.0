import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as credKey from '../../../../../sheets-cred-key_studyBuddy.json'

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
  userInfo: string;

  constructor() {
    this.clientId = credKey.client_id;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.register,
      onfailure: this.onFailure,
    })
  }

  register(googleUser?): void {
    if (googleUser) {
      console.log(googleUser.getBasicProfile());
      console.log(googleUser);
    }
    // this.userInfo = googleUser.getBasicProfile();
  }

  onFailure(): void {

  }

}
