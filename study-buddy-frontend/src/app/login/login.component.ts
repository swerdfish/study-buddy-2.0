import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as credKey from '../../../../../sheets-cred-key_studyBuddy.json'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  clientId: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(private router: Router) {
    this.clientId = credKey.client_id;
  }

  login(googleUser?): void {
    console.log("login");
    let profile = googleUser.getBasicProfile();
    console.log(profile.getGivenName());
    console.log(profile.getFamilyName());
    console.log(profile.getEmail());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    let self = this;
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: (googleUser) => {
        let profile = googleUser.getBasicProfile();
        self.firstName = profile.getGivenName();
        self.lastName = profile.getFamilyName();
        self.email = profile.getEmail();
      },
      onfailure: this.onFailure
    });
  }

  onFailure(error: any): void {
    console.log(error);
  }

}
