import { Component, OnInit } from '@angular/core';
import { FlashcardDeckServiceDeprecated } from '../flashcard-deck-deprecated.service';
import { FlashcardDeck } from '../model/flashcard-deck';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-deck-dashboard',
  templateUrl: './deck-dashboard.component.html',
  styleUrls: ['./deck-dashboard.component.css']
})
export class DeckDashboardComponent implements OnInit {

  decks: FlashcardDeck[];
  deckGroup: FlashcardDeck[];
  screenSize: number;

  get selectOrClear(): boolean { return this._selectOrClear; }
  set selectOrClear(selectOrClear: boolean) {
    if (selectOrClear === true) {
      this.deckserv.changeDecksInGroup(Array.from(this.decks));
    } else if (selectOrClear === false) {
      this.deckserv.clearDecksInGroup();
    }
    this._selectOrClear = selectOrClear;
  }
  private _selectOrClear: boolean;

  constructor(private deckserv: FlashcardDeckServiceDeprecated) {
  }

  ngOnInit(): void {
    this.deckserv.currentDecks.subscribe(decks => this.decks = decks);
    this.deckserv.currentDeckGroup.subscribe(gdecks => this.deckGroup = gdecks);

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
