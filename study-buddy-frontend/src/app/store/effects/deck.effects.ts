import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as deckActions from '../actions/deck.actions';
import { selectDeckState } from '../index';
import { FlashcardDeckService } from 'src/app/flashcard-deck.service';
import { FlashcardDeck } from 'src/app/model/flashcard-deck';



@Injectable()
export class DeckEffects {

  constructor(private actions$: Actions, private fdserv: FlashcardDeckService, private store: Store) { }

  deleteActiveDeck$: Observable<Action> = createEffect(() => this.actions$.pipe(
    // If delete active deck action
    ofType(deckActions.deleteActiveDeck),
    // Get the current deck state
    withLatestFrom(this.store.select(selectDeckState)),
    // Update the backend by deleting the deck
    map(([{ token }, deckState]) => {
      let activeDeckIdNumber = +deckState.activeDeck.deckId;
      if (activeDeckIdNumber !== 0 && !activeDeckIdNumber) activeDeckIdNumber = 0;
      this.fdserv.deleteFlashcardDeckById(activeDeckIdNumber, token).subscribe();
      return deckActions.removeFromUserDecks({ deck: deckState.activeDeck });
    })
  ));

  deleteSelectedDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    // If delete active deck action
    ofType(deckActions.deleteSelectedDecks),
    // Get the current deck state
    withLatestFrom(this.store.select(selectDeckState)),
    // Update the backend by deleting the deck
    map(([{ token }, deckState]) => {
      let selectedDecks: FlashcardDeck[] = deckState.selectedDecks;
      let selectedDeckIds: number[] = selectedDecks.map((deck: FlashcardDeck) => {
        let deckId: number = +deck.deckId;
        if (deckId !== 0 && !deckId) deckId = 0;
        return deckId;
      });
      this.fdserv.deleteFlashcardDecksByIds(selectedDeckIds, token).subscribe();
      return deckActions.removeDecksFromUserDecks({ decks: selectedDecks });
    })
  ));

  deleteUserDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.deleteUserDecks),
    withLatestFrom(this.store.select(selectDeckState)),
    switchMap(([{ token }]) => this.fdserv.deleteFlashcardDecksOwnedByUser(token)),
    map(() => deckActions.clearAllDecks())
  ));

  fetchUserDecks$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.fetchUserDecks),
    switchMap(props => this.fdserv.getFlashcardDecksOwnedByUser(props.token)),
    map((decks: FlashcardDeck[]) => deckActions.changeUserDecks({ decks: decks }))
  ));

  saveActiveDeck$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveActiveDeck),
    withLatestFrom(this.store.select(selectDeckState)),
    switchMap(([{ token }, deckState]) => this.fdserv.createFlashcardDeck(deckState.activeDeck, token)),
  ), { dispatch: false });

  saveSelectedDecks$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveSelectedDecks),
    withLatestFrom(this.store.select(selectDeckState)),
    switchMap(([{ token }, deckState]) => this.fdserv.createFlashcardDecks(deckState.selectedDecks, token))
  ), { dispatch: false });

  saveUserDecks$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.saveUserDecks),
    withLatestFrom(this.store.select(selectDeckState)),
    switchMap(([{ token }, deckState]) => this.fdserv.createFlashcardDecks(deckState.userDecks, token))
  ), { dispatch: false });

}
