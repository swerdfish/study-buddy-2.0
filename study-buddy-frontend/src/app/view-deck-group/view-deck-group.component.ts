import { Component, OnInit } from '@angular/core';
import { CompositeDeck } from '../model/composite-deck.model';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedDecks } from '../store';
import * as deckActions from '../store/actions/deck.actions';
import { Utilities } from '../utilities';

@Component({
  selector: 'app-view-deck-group',
  templateUrl: './view-deck-group.component.html',
  styleUrls: ['./view-deck-group.component.css']
})
export class ViewDeckGroupComponent implements OnInit {

  getSelectedDecks: Observable<FlashcardDeck[]>;
  compositeDeck: CompositeDeck;
  currentCardIndex: number;
  showQuestion: boolean;
  refresh: boolean;
  cardOrder: number[];
  blackOrWhite: boolean;

  constructor(private store: Store) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
    this.refresh = false;
    this.getSelectedDecks = this.store.select(selectSelectedDecks);
  }

  deleteDeck(): void {
    let deckId: string = this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].deckId;
    this.store.dispatch(deckActions.deleteDeckById({ deckId: deckId }))
  }

  flipCard(): void {
    this.showQuestion = !this.showQuestion;
  }

  nextCard(): void {
    if (++this.currentCardIndex >= this.compositeDeck.compCards.length) {
      this.currentCardIndex -= this.compositeDeck.compCards.length;
    }
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].color);
    this.showQuestion = true;
  }

  prevCard(): void {
    if (--this.currentCardIndex < 0) {
      this.currentCardIndex += this.compositeDeck.compCards.length;
    }
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].color);
    this.showQuestion = true;
  }

  ngOnInit(): void {
    this.getSelectedDecks.subscribe(selectedDecks => {
      this.compositeDeck = new CompositeDeck(selectedDecks);
      // Populate cards if not already populated
      if (this.compositeDeck.compCards.length == 0) this.refreshDeckGroup();
      // Start cardOrder in sequential order
      this.cardOrder = [...Array(this.compositeDeck.compCards.length).keys()];
      this.blackOrWhite = Utilities.calcBlackOrWhite(this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].color);
    });
  }

  refreshDeckGroup(): void {
    this.refresh = !this.refresh;
    this.getSelectedDecks.subscribe(selectedDecks => {
      for (let s = 0; s < selectedDecks.length; s++) {
        this.store.dispatch(deckActions.populateCardsForDeckId({ deckId: selectedDecks[s].deckId }));
        // selectedDecks[s].populateCards(true);
      }
      console.log("new!");
      this.compositeDeck = new CompositeDeck(selectedDecks);
      let difference = this.compositeDeck.compCards.length - this.cardOrder.length;
      if (difference < 0) {
        // the amount of cards shrunk, remove elements from cardOrder
        let newCardOrder = [];
        for (let c = 0; c < this.cardOrder.length; c++) {
          let suspectNumber = this.cardOrder[c];
          if (suspectNumber < this.cardOrder.length + difference) {
            newCardOrder.push(suspectNumber);
          }
        }
        this.cardOrder = newCardOrder;
      } else if (difference > 0) {
        // the amount of cards increased, add elements to cardOrder
        for (let d = 0; d < difference; d++) {
          this.cardOrder.push(this.cardOrder.length + d);
        }
      }
      if (this.currentCardIndex == this.compositeDeck.compCards.length - 1) {
        this.currentCardIndex = 0;
      }
      console.log("done");
    });
    this.refresh = !this.refresh;
  }

  reverseCards(): void {
    this.cardOrder.reverse();
  }

  shuffle(arr: Array<any>): void {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  shuffleCards(): void {
    this.shuffle(this.cardOrder);
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].color);
    this.showQuestion = true;
  }

  unshuffleCards(): void {
    this.cardOrder = [...Array(this.compositeDeck.compCards.length).keys()];
    this.blackOrWhite = Utilities.calcBlackOrWhite(this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].color);
    this.showQuestion = true;
  }

}
