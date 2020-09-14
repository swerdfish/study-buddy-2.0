import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as auth from './reducers/auth.reducer';
import * as deck from './reducers/deck.reducer';


export interface AppState {
  authState: auth.AuthState;
  deckState: deck.DeckState;
}

export const reducers/*: ActionReducerMap<State> */ = {
  auth: auth.authReducer,
  deck: deck.deckReducer
};

export const selectAuthState = createFeatureSelector<auth.AuthState>(auth.authFeatureKey);

export const selectDeckState = createFeatureSelector<deck.DeckState>(deck.deckFeatureKey);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
