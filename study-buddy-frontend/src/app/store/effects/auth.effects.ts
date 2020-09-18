import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GoogleApiService } from 'src/app/google-api.service';
import { Router } from '@angular/router';
import { AuthActionTypes, GoogleLoginSuccess, GoogleLoginFailure } from '../actions/auth.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/model/user.model';
import { HttpResponse } from '@angular/common/http';
import * as deckActions from '../actions/deck.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private gserv: GoogleApiService,
    private router: Router,
    private userv: UserService
  ) { }

  @Effect()
  GoogleLogin: Observable<GoogleLoginSuccess | GoogleLoginFailure> = this.actions$.pipe(
    ofType(AuthActionTypes.GOOGLE_LOGIN),
    switchMap(() => this.gserv.getGoogleAuthInstance()),
    switchMap((authInst: gapi.auth2.GoogleAuth) => {
      let isGoogleSignedIn = authInst.isSignedIn.get();
      if (isGoogleSignedIn) {
        return of(authInst.currentUser.get().getAuthResponse().id_token);
      } else {
        from(authInst.signIn().then(googleUser => {
          return googleUser.getAuthResponse().id_token;
        }))
      }
    }),
    switchMap((idToken: string) => {
      console.log(idToken);
      return this.userv.loginGoogleUser(idToken);
    }),
    map((resp: HttpResponse<User>) => {
      console.log(resp.headers.keys);
      return new GoogleLoginSuccess({ user: resp.body, token: resp.headers.get('Authorization').split(" ")[1] });
    }),
    catchError(() => {
      return of(new GoogleLoginFailure(null));
    })
  );

  // @Effect({ dispatch: false })
  // GoogleLoginSuccess: Observable<any> = this.actions$.pipe(
  //   ofType(AuthActionTypes.GOOGLE_LOGIN_SUCCESS),
  //   map((action: GoogleLoginSuccess) => action.payload),
  // );

  @Effect()
  GoogleRegister: Observable<GoogleLoginSuccess | GoogleLoginFailure> = this.actions$.pipe(
    ofType(AuthActionTypes.GOOGLE_REGISTER),
    switchMap(() => this.gserv.getGoogleAuthInstance()),
    switchMap((authInst: gapi.auth2.GoogleAuth) => {
      let isGoogleSignedIn = authInst.isSignedIn.get();
      if (isGoogleSignedIn) {
        return of(authInst.currentUser.get().getAuthResponse().id_token);
      } else {
        return from(authInst.signIn().then(googleUser => {
          return googleUser.getAuthResponse().id_token;
        }))
      }
    }),
    switchMap((idToken: string) => {
      console.log(idToken);
      return this.userv.registerGoogleUser(idToken);
    }),
    map((resp: HttpResponse<User>) => {
      console.log(resp.headers);
      return new GoogleLoginSuccess({ user: resp.body, token: resp.headers.get('Authorization').split(" ")[1] });
    }),
    catchError(() => {
      return of(new GoogleLoginFailure(null));
    })
  );

  @Effect()
  GoogleLoginFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GOOGLE_LOGIN_FAILURE),
    tap((action: GoogleLoginFailure) => {
      this.router.navigateByUrl('/error');
    })
  );

  @Effect()
  GoogleLoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GOOGLE_LOGIN_SUCCESS),
    map(() => deckActions.fetchUserDecks())
  )

}
