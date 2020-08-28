import { User } from 'src/app/model/user.model';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  isGoogleAuthed: boolean;
  loading: boolean;
  error: string;
}

export const initialAuthState: AuthState = {
  user: new User(),
  isGoogleAuthed: false,
  loading: false,
  error: null
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.GOOGLE_LOGIN_FAILURE: {
      return {
        ...state,
        isGoogleAuthed: false,
        loading: false,
        error: "Failed to authenticate with google"
      }
    }
    case AuthActionTypes.GOOGLE_LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGoogleAuthed: true,
      }
    }
    default:
      return state;
  }
}
