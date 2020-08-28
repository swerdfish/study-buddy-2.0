import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export enum AuthActionTypes {
  AUTH_ERROR = '[Auth] Authorization Error',
  GOOGLE_LOGIN_FAILURE = '[Auth] Google Login Failure',
  GOOGLE_LOGIN_SUCCESS = '[Auth] Google Login Success',
  GOOGLE_LOGOUT = '[Auth] Google Logout',
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload: any) { }
}

export class GoogleLoginFailure implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class GoogleLoginSuccess implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN_SUCCESS;
  constructor(public payload: { user: User }) { }
}

export class GoogleLogout implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGOUT;
  constructor(public payload: any) { }
}

export type AuthActions =
  | AuthError
  | GoogleLoginFailure | GoogleLoginSuccess
  | GoogleLogout;

