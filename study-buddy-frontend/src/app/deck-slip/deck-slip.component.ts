import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckServiceDeprecated } from '../flashcard-deck-deprecated.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-slip',
  templateUrl: './deck-slip.component.html',
  styleUrls: ['./deck-slip.component.css']
})
export class DeckSlipComponent implements OnInit {

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
  // @Output() checkEvent = new EventEmitter<boolean>();

  constructor(private deckserv: FlashcardDeckServiceDeprecated, private router: Router) {
    this.refresh = false;
  }

  ngOnInit(): void {
    this.checked = false;
    this.deckserv.currentDeckGroup.subscribe(groupDecks => {
      // console.log("test test 1, 2");
      if (groupDecks.length == 0) {
        this.checked = false;
      } else {
        for (let gdeck of groupDecks) {
          if (this.deck.deckId == gdeck.deckId) {
            // console.log(this.deck.deckId);
            // console.log(gdeck.deckId);
            this.checked = true;
            break;
          }/* else {
            // console.log("hello");
            this.checked = false;
          }*/
        }
      }
    });
  }

  viewDeck() {
    this.deckserv.changeActiveDeck(this.deck);
    this.router.navigateByUrl('/view');
  }

  refreshDeck() {
    this.refresh = true;
    this.deck.populateCards(true);
    this.refresh = false;
  }

  deleteDeck() {
    console.log("Delete deck.")
    this.deckserv.removeDeck(this.deck);
  }

  checkbox() {
    this.checked = !this.checked;
    if (this.checked) {
      this.deckserv.addDeckToGroup(this.deck);
    } else {
      this.deckserv.removeDeckFromGroup(this.deck);
    }
    // this.checkEvent.emit(this.checked);
  }

}
