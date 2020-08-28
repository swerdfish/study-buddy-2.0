import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { selectAuthState } from '../store';
// import { AuthState } from '../store/reducers/auth.reducer';
import { GoogleApiService } from '../google-api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // getState: Observable<AuthState>;
  // isGoogleAuthed: boolean;
  token: string;

  constructor(private gserv: GoogleApiService/*, private store: Store*/) {
    // this.getState = this.store.select(selectAuthState);
    // this.getState.subscribe(authState => this.isGoogleAuthed = authState.isGoogleAuthed);
    this.gserv.getGoogleAuthInstance().subscribe((authInst: gapi.auth2.GoogleAuth) => {
      if (authInst.isSignedIn.get()) {
        this.token = authInst.currentUser.get().getAuthResponse().id_token;
      } else {
        this.token = null;
      }
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      return next.handle(request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }));
    } else {
      return next.handle(request);
    }
  }
}
