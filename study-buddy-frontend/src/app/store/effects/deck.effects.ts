import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import * as deckActions from '../actions/deck.actions';
import {
  AppState,
  selectActiveDeckAndToken,
  selectSelectedDecksAndToken,
  selectToken,
  selectUserDecksAndToken
} from '../index';
import { FlashcardDeckService } from 'src/app/flashcard-deck.service';
import { FlashcardDeck } from 'src/app/model/flashcard-deck';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class DeckEffects {

  constructor(
    private actions$: Actions,
    private fdserv: FlashcardDeckService,
    private store$: Store<AppState>) { }

  deleteActiveDeck$: Observable<Action> = createEffect(() => this.actions$.pipe(
    // If delete active deck action
    ofType(deckActions.deleteActiveDeck),
    // Get the token
    withLatestFrom(this.store$.select(selectActiveDeckAndToken)),
    // Update the backend by deleting the deck
    switchMap(([_, { activeDeck, token }]) => {
      let activeDeckIdNumber = +activeDeck.deckId;
      if (activeDeckIdNumber !== 0 && !activeDeckIdNumber) activeDeckIdNumber = 0;
      return this.fdserv.deleteFlashcardDeckById(activeDeckIdNumber, token);
    }),
    // Set the new access token
    map((response: HttpResponse<void>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  deleteDeck$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.deleteDeck),
    withLatestFrom(this.store$.select(selectToken)),
    switchMap(([{ deck }, token]) => {
      let deckIdToRemove: number = +deck.deckId;
      if (deckIdToRemove !== 0 && !deckIdToRemove) deckIdToRemove = 0;
      return this.fdserv.deleteFlashcardDeckById(deckIdToRemove, token);
    }),
    map((response: HttpResponse<void>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  deleteDeckById$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.deleteDeckById),
    withLatestFrom(this.store$.select(selectToken)),
    switchMap(([{ deckId }, token]) => {
      let deckIdToRemove: number = +deckId;
      if (deckIdToRemove !== 0 && !deckIdToRemove) deckIdToRemove = 0;
      return this.fdserv.deleteFlashcardDeckById(deckIdToRemove, token);
    }),
    map((response: HttpResponse<void>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  deleteSelectedDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    // If delete active deck action
    ofType(deckActions.deleteSelectedDecks),
    // Get the current deck state
    withLatestFrom(this.store$.select(selectSelectedDecksAndToken)),
    // Update the backend by deleting the deck
    switchMap(([_, { selectedDecks, token }]) => {
      let selectedDeckIds: number[] = selectedDecks
        .filter((deck: FlashcardDeck) => +deck.deckId > 0)
        .map((deck: FlashcardDeck) => +deck.deckId);
      return this.fdserv.deleteFlashcardDecksByIds(selectedDeckIds, token);
    }),
    map((response: HttpResponse<void>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  deleteUserDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.deleteUserDecks),
    withLatestFrom(this.store$.select(selectToken)),
    switchMap(([_, token]) => this.fdserv.deleteFlashcardDecksOwnedByUser(token)),
    map((response: HttpResponse<void>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  fetchUserDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.fetchUserDecks),
    withLatestFrom(this.store$.select(selectToken)),
    switchMap(([_, token]) => this.fdserv.getFlashcardDecksOwnedByUser(token)),
    map((response: HttpResponse<FlashcardDeck[]>) =>
      deckActions.fetchUserDecksSuccessful(
        {
          userDecks: response.body,
          token: response.headers.get("Authorization").split(" ")[1]
        }
      )
    )
  ));

  fetchUserDecksSuccessful$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.fetchUserDecksSuccessful),
    map(payload => new authActions.SetAccessToken({ token: payload.token }))
  ))

  saveActiveDeck$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveActiveDeck),
    withLatestFrom(this.store$.select(selectActiveDeckAndToken)),
    switchMap(([_, { activeDeck, token }]) => this.fdserv.createFlashcardDeck(activeDeck, token)),
    map((response: HttpResponse<FlashcardDeck>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  saveSelectedDecks$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveSelectedDecks),
    withLatestFrom(this.store$.select(selectSelectedDecksAndToken)),
    switchMap(([_, { selectedDecks, token }]) => this.fdserv.createFlashcardDecks(selectedDecks, token)),
    map((response: HttpResponse<FlashcardDeck[]>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

  saveUserDecks$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveUserDecks),
    withLatestFrom(this.store$.select(selectUserDecksAndToken)),
    switchMap(([_, { userDecks, token }]) => this.fdserv.createFlashcardDecks(userDecks, token)),
    map((response: HttpResponse<FlashcardDeck[]>) => new authActions.SetAccessToken(
      { token: response.headers.get("Authorization").split(" ")[1] }
    ))
  ));

}
