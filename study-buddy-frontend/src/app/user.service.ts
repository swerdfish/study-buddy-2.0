import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url: string = "http://localhost:9000";

  constructor(private http: HttpClient) { }

  registerGoogleUser(idToken: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.url + "/register", null, {
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      observe: 'response'
    });
  }

  loginGoogleUser(idToken: string): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.url + "/login", null, {
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json"
      },
      observe: 'response'
    });
  }

}
