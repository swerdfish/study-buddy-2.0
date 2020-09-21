import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import * as deckActions from '../actions/deck.actions';
import {
  AppState,
  selectActiveDeckAndToken,
  selectSelectedDecksAndToken,
  selectToken,
  selectUserDecks,
  selectUserDecksAndToken
} from '../index';
import { FlashcardDeckService } from 'src/app/flashcard-deck.service';
import { FlashcardDeck } from 'src/app/model/flashcard-deck';
import { HttpResponse } from '@angular/common/http';
import { GoogleApiService } from 'src/app/google-api.service';
import { Flashcard } from 'src/app/model/flashcard';
// import { Router } from '@angular/router';



@Injectable()
export class DeckEffects {

  constructor(
    private actions$: Actions,
    private fdserv: FlashcardDeckService,
    private gserv: GoogleApiService,
    // private router: Router,
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

  // deleteDeck$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(deckActions.deleteDeck),
  //   withLatestFrom(this.store$.select(selectToken)),
  //   switchMap(([{ deck }, token]) => {
  //     console.log(deck);
  //     let deckIdToRemove: number = +deck.deckId;
  //     if (deckIdToRemove !== 0 && !deckIdToRemove) deckIdToRemove = 0;
  //     console.log(deckIdToRemove);
  //     return this.fdserv.deleteFlashcardDeckById(deckIdToRemove, token);
  //   }),
  //   map((response: HttpResponse<void>) => new authActions.SetAccessToken(
  //     { token: response.headers.get("Authorization").split(" ")[1] }
  //   ))
  // ));

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
    map(payload => {
      let ssids = Array.from(new Set(payload.userDecks.map(udeck => udeck.spreadsheetInfo.spreadsheetId)));
      console.log(ssids);
      // this.router.navigateByUrl('/home');
      // return new authActions.SetAccessToken({ token: payload.token });
      return deckActions.populateAllCards({ spreadsheetIds: ssids, token: payload.token });
    })
  ));

  populateAllCards$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.populateAllCards),
    withLatestFrom(this.store$.select(selectUserDecks)),
    switchMap(([{ spreadsheetIds, token }, userDecks]) => {
      let ssidsDecks: Record<string, FlashcardDeck[]> = {};
      userDecks.forEach(udeck => {
        if (udeck.spreadsheetInfo.spreadsheetId in ssidsDecks) {
          ssidsDecks[udeck.spreadsheetInfo.spreadsheetId].push({
            deckId: udeck.deckId,
            spreadsheetInfo: udeck.spreadsheetInfo,
            cards: [],
            title: udeck.title,
            color: udeck.color,
            hashCode: udeck.hashCode
          });
        } else {
          ssidsDecks[udeck.spreadsheetInfo.spreadsheetId] = [{
            deckId: udeck.deckId,
            spreadsheetInfo: udeck.spreadsheetInfo,
            cards: [],
            title: udeck.title,
            color: udeck.color,
            hashCode: udeck.hashCode
          }];
        }
      });
      return from(spreadsheetIds).pipe(
        mergeMap((spreadsheetId: string) =>
          this.gserv.getAllSheetValues(spreadsheetId).pipe(
            map(resp => {
              ssidsDecks[spreadsheetId].forEach(deck => {
                let sheet: gapi.client.sheets.Sheet;
                for (let sht of resp.result.sheets) {
                  if (sht.properties.title == deck.title) {
                    console.log(sht.properties.title);
                    console.log(deck.title);
                    sheet = sht;
                    break;
                  }
                }
                console.log(sheet);
                if (sheet.data) {
                  console.log(sheet.data);
                  for (let gridData of sheet.data) {
                    for (let row of gridData.rowData.slice(deck.spreadsheetInfo.headerRows)) {
                      // console.log(row.values);
                      let qIndex: number = this.colStringToIndex(deck.spreadsheetInfo.queCol);
                      if (!row.values[qIndex].userEnteredValue) break;
                      let aIndex: number = this.colStringToIndex(deck.spreadsheetInfo.ansCol);
                      let question: string = row.values[qIndex].userEnteredValue.stringValue;
                      let answer: string = row.values[aIndex].userEnteredValue ? row.values[aIndex].userEnteredValue.stringValue : "<null>";
                      deck.cards.push(new Flashcard(question, answer));
                    }
                  }
                }
              });
              return ssidsDecks[spreadsheetId];
            })
          )
        ),
        map(decks => {
          console.log(decks);
          return deckActions.populateCardsUpdateDecksSuccessful({ decks: decks, token: token })
        })
      )
    })
  ));

  populateCardsForDeckId$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(deckActions.populateCardsForDeckId),
    withLatestFrom(this.store$.select(selectUserDecks)),
    switchMap(([{ deckId }, userDecks]) => {
      // console.log(deckId);
      let deck = userDecks.filter(udeck => udeck.deckId == deckId)[0];
      let ssid = deck.spreadsheetInfo.spreadsheetId;
      let title = deck.title;
      let qcol = deck.spreadsheetInfo.queCol;
      let acol = deck.spreadsheetInfo.ansCol;
      let headerRows = deck.spreadsheetInfo.headerRows;
      return this.gserv.getValues(ssid, `'${title}'!${qcol}:${acol}`).pipe(
        map(resp => {
          let popDeck = new FlashcardDeck(ssid, title, qcol, acol, headerRows, deckId);
          popDeck.cards = [];
          if (qcol < acol) {
            for (let value of resp.result.values.slice(headerRows)) {
              popDeck.cards.push(new Flashcard(value[0], value[value.length - 1]));
            }
          } else {
            for (let value of resp.result.values.slice(headerRows)) {
              popDeck.cards.push(new Flashcard(value[value.length - 1], value[0]));
            }
          }
          let newUserDecks: FlashcardDeck[] = userDecks.map(
            udeck => udeck.deckId == deck.deckId ? popDeck : udeck);
          return deckActions.changeUserDecks({ decks: newUserDecks });
        })
      );
    })
  ));

  populateCardsForSpreadsheetId$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.populateCardsForSpreadsheetId),
    withLatestFrom(this.store$.select(selectUserDecks)),
    switchMap(([{ spreadsheetId }, userDecks]) => {
      let decksToPopulate = userDecks.filter(udeck => udeck.spreadsheetInfo.spreadsheetId == spreadsheetId);
      let decksUnchanged = userDecks.filter(udeck => udeck.spreadsheetInfo.spreadsheetId != spreadsheetId);
      return this.gserv.getAllSheetInfo(spreadsheetId).pipe(
        map(resp => {
          let spreadsheet = resp.result;
          for (let sheet of spreadsheet.sheets) {
            let d: number = undefined;
            for (let p = 0; p < decksToPopulate.length; p++) {
              if (decksToPopulate[p].title == sheet.properties.title) {
                d = p;
                break;
              }
            }
            if (d != 0 && !d) continue;
            let qThenA = decksToPopulate[d].spreadsheetInfo.queCol < decksToPopulate[d].spreadsheetInfo.ansCol;
            decksToPopulate[d].cards = [];
            for (let gridData of sheet.data) {
              for (let r of gridData.rowData.slice(decksToPopulate[d].spreadsheetInfo.headerRows)) {
                decksToPopulate[d].cards.push(
                  new Flashcard(
                    r.values[qThenA ? 0 : r.values.length - 1].userEnteredValue.stringValue,
                    r.values[qThenA ? r.values.length - 1 : 0].userEnteredValue.stringValue
                  )
                );
              }
            }
          }
          return deckActions.changeUserDecks({ decks: decksUnchanged.concat(decksToPopulate) });
        })
      )
    })
  ));

  populateCardsUpdateDecksSuccessful$ = createEffect(() => this.actions$.pipe(
    ofType(deckActions.populateCardsUpdateDecksSuccessful),
    map(({ token }) => new authActions.SetAccessToken({ token: token }))
  ));

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
    switchMap(([_, { selectedDecks, token }]) => {
      console.log(token);
      return this.fdserv.createFlashcardDecks(selectedDecks, token);
    }),
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

  colStringToIndex(col: string): number {
    let index: number = 0;
    for (let s = col.length - 1; s > -1; s--) {
      let temp = (col.toLowerCase().charCodeAt(s) - 'a'.charCodeAt(0) + 1);
      for (let i = 0; i < col.length - 1 - s; i++) temp *= 26;
      index += temp;
    }
    return index - 1;
  }

}
