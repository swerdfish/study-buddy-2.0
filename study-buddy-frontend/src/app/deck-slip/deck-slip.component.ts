import { Component, OnInit, Input, Output } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDeckState, selectLoggedIn, selectSelectedDecks } from '../store';
import * as deckActions from '../store/actions/deck.actions';
import { Utilities } from '../utilities';
import { DeckState } from '../store/reducers/deck.reducer';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-deck-slip',
  templateUrl: './deck-slip.component.html',
  styleUrls: ['./deck-slip.component.css']
})
export class DeckSlipComponent implements OnInit {

  // getSelectedDecks: Observable<FlashcardDeck[]>;
  getDeckState: Observable<DeckState>;
  getLoggedIn: Observable<boolean>;
  isLoggedIn: boolean;
  color: string;
  blackOrWhite: boolean;
  @Input() deck: FlashcardDeck;
  @Input() // select is true, clear is false
  get selectOrClear(): boolean { return this._selectOrClear; }
  set selectOrClear(selectOrClear: boolean) {
    if (selectOrClear === true || selectOrClear === false) {
      this.checked = selectOrClear;
    }
    this._selectOrClear = selectOrClear;
  }
  private _selectOrClear: boolean;
  @Input() screenSize: number;
  refresh: boolean;
  checked: boolean;

  // @Output() close = new EventEmitter();

  constructor(
    private router: Router,
    private store: Store) {
    // this.getSelectedDecks = this.store.select(selectSelectedDecks);
    this.getDeckState = this.store.select(selectDeckState);
    this.getLoggedIn = this.store.select(selectLoggedIn);
    this.refresh = false;
  }

  ngOnInit(): void {
    this.checked = false;
    // this.getSelectedDecks.subscribe(selectedDecks => {
    this.getDeckState.subscribe(deckState => {
      let selectedDecks = deckState.selectedDecks;
      this.checked = false;
      if (selectedDecks && selectedDecks.length > 0) {
        for (let sdeck of selectedDecks) {
          if (this.deck.deckId == sdeck.deckId) {
            this.checked = true;
            break;
          }
        }
      }
      for (let udeck of deckState.userDecks) {
        if (this.deck.deckId == udeck.deckId) {
          let temp: FlashcardDeck = new FlashcardDeck(udeck.spreadsheetInfo.spreadsheetId, udeck.title, udeck.spreadsheetInfo.queCol, udeck.spreadsheetInfo.ansCol, udeck.spreadsheetInfo.headerRows, udeck.deckId, udeck.color);
          temp.cards = udeck.cards;
          this.deck = temp;
          this.color = udeck.color;
          this.blackOrWhite = Utilities.calcBlackOrWhite(this.color);
          break;
        }
      }
    });
    this.getLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.color = this.deck.color;
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.color);
  }

  viewDeck() {
    this.store.dispatch(deckActions.changeActiveDeck({ deck: this.deck }));
    this.router.navigateByUrl('/view');
  }

  refreshDeck() {
    this.refresh = true;
    // this.deck.populateCards(true);
    // console.log(this.deck.deckId);
    this.store.dispatch(
      deckActions.populateCardsForDeckId({ deckId: this.deck.deckId })
    );
    this.refresh = false;
  }

  deleteDeck() {
    console.log(this.deck);
    this.store.dispatch(deckActions.deleteDeck({ deck: this.deck }));
    // this.close.emit(null);
  }

  checkbox() {
    this.checked = !this.checked;
    if (this.checked) {
      this.store.dispatch(deckActions.addToSelectedDecks({ deck: this.deck }));
    } else {
      this.store.dispatch(deckActions.removeFromSelectedDecks({ deck: this.deck }));
    }
  }

  updateDeckColor() {
    let temp: FlashcardDeck = new FlashcardDeck(this.deck.spreadsheetInfo.spreadsheetId, this.deck.title, this.deck.spreadsheetInfo.queCol, this.deck.spreadsheetInfo.ansCol, this.deck.spreadsheetInfo.headerRows, this.deck.deckId, this.color);
    temp.cards = this.deck.cards;
    this.deck = temp;
    this.store.dispatch(deckActions.updateDeck({ deck: this.deck }));
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.deck.color);
  }

  getSlipStyles() {
    let slipStyles = {
      'background-color': this.deck.color,
      'box-shadow':
        this.checked ?
          `inset 5px 5px 15px ${this.blackOrWhite ? '#00000027' : '#FFFFFF27'}, inset -5px -5px 15px ${this.blackOrWhite ? '#00000027' : '#FFFFFF27'};` :
          '5px 5px 10px #00000027',
      'outline': `${this.checked ? "#363636" + ' solid 3px' : ''}`,
      'outline-offset': `${this.checked ? '2px' : ''}`
    }
    return slipStyles;
  }

}
