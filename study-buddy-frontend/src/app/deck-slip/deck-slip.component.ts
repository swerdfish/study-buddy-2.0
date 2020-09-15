import { Component, OnInit, Input } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedDecks } from '../store';
import * as deckActions from '../store/actions/deck.actions';

@Component({
  selector: 'app-deck-slip',
  templateUrl: './deck-slip.component.html',
  styleUrls: ['./deck-slip.component.css']
})
export class DeckSlipComponent implements OnInit {

  getSelectedDecks: Observable<FlashcardDeck[]>;
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
    // private deckserv: FlashcardDeckServiceDeprecated,
    private router: Router,
    private store: Store) {
    this.getSelectedDecks = this.store.select(selectSelectedDecks);
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
  }

  viewDeck() {
    this.store.dispatch(deckActions.changeActiveDeck({ deck: this.deck }));
    this.router.navigateByUrl('/view');
  }

  refreshDeck() {
    this.refresh = true;
    this.deck.populateCards(true);
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

}
