import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GoogleApiService } from 'src/app/google-api.service';
import { Router } from '@angular/router';
import { AuthActionTypes, GoogleLoginSuccess, GoogleLoginFailure } from '../actions/auth.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/model/user.model';
import { HttpResponse } from '@angular/common/http';


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
      let idToken = authInst.currentUser.get().getAuthResponse().id_token;
      console.log(idToken);
      return this.userv.loginGoogleUser(idToken);
    }),
    map((resp: HttpResponse<User>) => {
      return new GoogleLoginSuccess({ user: resp.body, token: resp.headers.get('Authorization') });
    }),
    catchError(() => {
      return of(new GoogleLoginFailure(null));
    })
  );

  @Effect({ dispatch: false })
  GoogleLoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.GOOGLE_LOGIN_SUCCESS),
    map((action: GoogleLoginSuccess) => action.payload),
  );

}
