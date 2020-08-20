import { Component, OnInit } from '@angular/core';
import { CompositeDeck } from '../model/composite-deck.model';
import { FlashcardDeckService } from '../flashcard-deck.service';
import { FlashcardDeck } from '../model/flashcard-deck';

@Component({
  selector: 'app-view-deck-group',
  templateUrl: './view-deck-group.component.html',
  styleUrls: ['./view-deck-group.component.css']
})
export class ViewDeckGroupComponent implements OnInit {

  compositeDeck: CompositeDeck;
  currentCardIndex: number;
  showQuestion: boolean;
  refresh: boolean;
  cardOrder: number[];

  constructor(private deckserv: FlashcardDeckService) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
    this.refresh = false;
  }

  deleteDeck(): void {
    let deck: FlashcardDeck;
    this.deckserv.currentDeckGroup.subscribe(gdecks => {
      for (let gd of gdecks) {
        if (gd.deckId = this.compositeDeck.compCards[this.cardOrder[this.currentCardIndex]].title) {
          deck = gd;
          break;
        }
      }
    })
    this.deckserv.removeDeckFromGroup(deck);
  }

  flipCard(): void {
    this.showQuestion = !this.showQuestion;
  }

  nextCard(): void {
    if (++this.currentCardIndex >= this.compositeDeck.compCards.length) {
      this.currentCardIndex -= this.compositeDeck.compCards.length;
    }
    this.showQuestion = true;
  }

  prevCard(): void {
    if (--this.currentCardIndex < 0) {
      this.currentCardIndex += this.compositeDeck.compCards.length;
    }
    this.showQuestion = true;
  }

  ngOnInit(): void {
    console.log(this.compositeDeck);
    this.deckserv.currentDeckGroup.subscribe(gdecks => {
      console.log(this.compositeDeck);
      console.log(gdecks);
      this.compositeDeck = new CompositeDeck(gdecks);
      // Populate cards if not already populated
      if (this.compositeDeck.compCards.length == 0) this.refreshDeckGroup();
      // Start cardOrder in sequential order
      this.cardOrder = [...Array(this.compositeDeck.compCards.length).keys()];
      console.log(this.compositeDeck);
    })
  }

  refreshDeckGroup(): void {
    this.refresh = !this.refresh;
    // this.deckserv.refreshDeckGroup();
    this.deckserv.currentDeckGroup.subscribe(gdecks => {
      for (let g = 0; g < gdecks.length; g++) {
        gdecks[g].populateCards(true);
      }
      console.log("new!");
      this.compositeDeck = new CompositeDeck(gdecks);
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
    this.showQuestion = true;
  }

  unshuffleCards(): void {
    this.cardOrder = [...Array(this.compositeDeck.compCards.length).keys()];
    this.showQuestion = true;
  }

}
