import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as auth from './reducers/auth.reducer';


export interface State {
  authState: auth.AuthState;
}

export const reducers/*: ActionReducerMap<State> */ = {
  auth: auth.authReducer
};

export const selectAuthState = createFeatureSelector<auth.AuthState>(auth.authFeatureKey);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
