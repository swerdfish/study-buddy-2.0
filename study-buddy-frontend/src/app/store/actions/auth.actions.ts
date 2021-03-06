import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export enum AuthActionTypes {
  AUTH_ERROR = '[Auth] Authorization Error',
  GOOGLE_LOGIN = '[Auth] Google Login',
  GOOGLE_LOGIN_FAILURE = '[Auth] Google Login Failure',
  GOOGLE_LOGIN_SUCCESS = '[Auth] Google Login Success',
  GOOGLE_LOGOUT = '[Auth] Google Logout',
  GOOGLE_REGISTER = '[Auth] Google Register',
  SET_ACCESS_TOKEN = '[Auth] Set Access Token'
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload: any) { }
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN;
  constructor(public payload: any) { }
}

export class GoogleLoginFailure implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class GoogleLoginSuccess implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN_SUCCESS;
  constructor(public payload: {
    user: User,
    token: string
  }) { }
}

export class GoogleLogout implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGOUT;
  constructor(public payload: any) { }
}

export class GoogleRegister implements Action {
  readonly type = AuthActionTypes.GOOGLE_REGISTER;
  constructor(public payload: any) { }
}

export class SetAccessToken implements Action {
  readonly type = AuthActionTypes.SET_ACCESS_TOKEN;
  constructor(public payload: { token: string }) { }
}

export type AuthActions =
  | AuthError
  | GoogleLogin | GoogleLoginFailure | GoogleLoginSuccess
  | GoogleLogout
  | GoogleRegister
  | SetAccessToken;

