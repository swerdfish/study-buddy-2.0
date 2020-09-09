import { User } from 'src/app/model/user.model';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
}

export const initialAuthState: AuthState = {
  user: new User(),
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    // case AuthActionTypes.GOOGLE_LOGIN: {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }
    case AuthActionTypes.GOOGLE_LOGIN_FAILURE: {
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: "Failed to authenticate with google"
      }
    }
    case AuthActionTypes.GOOGLE_LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
        isLoggedIn: true,
      }
    }
    case AuthActionTypes.GOOGLE_LOGOUT: {
      return initialAuthState;
    }
    // case AuthActionTypes.GOOGLE_REGISTER: {
    //   return {
    //     ...state,
    //     loading: true
    //   } 
    // }
    default:
      return state;
  }
}
