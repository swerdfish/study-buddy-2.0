import { Component, OnInit, Input } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoggedIn, selectSelectedDecks } from '../store';
import * as deckActions from '../store/actions/deck.actions';

@Component({
  selector: 'app-deck-slip',
  templateUrl: './deck-slip.component.html',
  styleUrls: ['./deck-slip.component.css']
})
export class DeckSlipComponent implements OnInit {

  getSelectedDecks: Observable<FlashcardDeck[]>;
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

  constructor(
    private router: Router,
    private store: Store) {
    this.getSelectedDecks = this.store.select(selectSelectedDecks);
    this.getLoggedIn = this.store.select(selectLoggedIn);
    this.refresh = false;
  }

  ngOnInit(): void {
    this.checked = false;
    this.getSelectedDecks.subscribe(selectedDecks => {
      this.checked = false;
      if (selectedDecks && selectedDecks.length > 0) {
        for (let sdeck of selectedDecks) {
          if (this.deck.deckId == sdeck.deckId) {
            this.checked = true;
            break;
          }
        }
      }
    });
    this.getLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.color = this.deck.color;
    this.blackOrWhite = this.calcBlackOrWhite(this.color);
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
    this.store.dispatch(deckActions.deleteDeck({ deck: this.deck }))
  }

  checkbox() {
    this.checked = !this.checked;
    if (this.checked) {
      this.store.dispatch(deckActions.addToSelectedDecks({ deck: this.deck }));
    } else {
      this.store.dispatch(deckActions.removeFromSelectedDecks({ deck: this.deck }));
    }
  }

  updateDeck() {
    this.deck = {
      ...this.deck,
      color: this.color,
      hashCode: this.deck.hashCode
    }
    this.store.dispatch(deckActions.updateDeck({ deck: this.deck }));
    this.blackOrWhite = this.calcBlackOrWhite(this.deck.color);
  }

  calcBlackOrWhite(hexColor: string) {
    let rgb = this.hexToRgb(hexColor);
    if (rgb) {
      let brightness = Math.round(
        (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
      );
      return brightness > 125;
    } else {
      return true;
    }
  }

  hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
