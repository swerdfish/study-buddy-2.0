import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime, map, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DeckState } from '../store/reducers/deck.reducer';
import { selectDeckState } from '../store';
import * as deckActions from '../store/actions/deck.actions';

@Component({
  selector: 'app-deck-dashboard',
  templateUrl: './deck-dashboard.component.html',
  styleUrls: ['./deck-dashboard.component.css']
})
export class DeckDashboardComponent implements OnInit {

  getDeckState: Observable<DeckState>;
  decks: FlashcardDeck[];
  selectedDecks: FlashcardDeck[];
  screenSize: number;

  get selectOrClear(): boolean { return this._selectOrClear; }
  set selectOrClear(selectOrClear: boolean) {
    if (selectOrClear === true) {
      this.store.dispatch(deckActions.addDecksToSelectedDecks({ decks: this.decks }));
    } else if (selectOrClear === false) {
      this.store.dispatch(deckActions.clearSelectedDecks());
    }
    this._selectOrClear = selectOrClear;
  }
  private _selectOrClear: boolean;

  constructor(private store: Store) {
    this.getDeckState = this.store.select(selectDeckState);
  }

  ngOnInit(): void {
    this.getDeckState.subscribe(state => {
      this.decks = state.userDecks;
      this.selectedDecks = state.selectedDecks;
    })

    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => document.body.offsetWidth;

    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(
      throttleTime(100),
      map(checkScreenSize),
      startWith(checkScreenSize())
    );

    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    screenSizeChanged$.subscribe(screenSize => this.screenSize = screenSize)
  }

}
