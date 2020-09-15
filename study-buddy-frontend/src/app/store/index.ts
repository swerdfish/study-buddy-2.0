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


// Authorization State specific

export const selectAuthState = createFeatureSelector<auth.AuthState>(auth.authFeatureKey);

export const selectToken = createSelector(
  selectAuthState,
  (authState: auth.AuthState) => authState.token
);


// Deck State Specific

export const selectDeckState = createFeatureSelector<deck.DeckState>(deck.deckFeatureKey);

export const selectActiveDeck = createSelector(
  selectDeckState,
  (deckState: deck.DeckState) => deckState.activeDeck
);

export const selectSelectedDecks = createSelector(
  selectDeckState,
  (deckState: deck.DeckState) => deckState.selectedDecks
);

export const selectUserDecks = createSelector(
  selectDeckState,
  (deckState: deck.DeckState) => deckState.userDecks
);


// Both Authorization and Deck State Required

export const selectActiveDeckAndToken = createSelector(
  selectAuthState,
  selectDeckState,
  (authState: auth.AuthState, deckState: deck.DeckState) => {
    return { activeDeck: deckState.activeDeck, token: authState.token };
  }
);

export const selectSelectedDecksAndToken = createSelector(
  selectAuthState,
  selectDeckState,
  (authState: auth.AuthState, deckState: deck.DeckState) => ({
    selectedDecks: deckState.selectedDecks, token: authState.token
  })
);

export const selectUserDecksAndToken = createSelector(
  selectAuthState,
  selectDeckState,
  (authState: auth.AuthState, deckState: deck.DeckState) => ({
    userDecks: deckState.userDecks, token: authState.token
  })
);


// Meta reducers

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
