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

  constructor(private router: Router) {
    this.clientId = credKey.client_id;
  }

  login(googleUser?): void {
    console.log("login");
    this.router.navigateByUrl("/dashboard");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    gapi.signin2.render('my-signin-2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.login,
      onfailure: this.onFailure
    });
  }

  onFailure(error): void {
    console.log(error);
  }

}
