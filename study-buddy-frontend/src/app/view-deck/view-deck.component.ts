import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckService } from '../flashcard-deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})
export class ViewDeckComponent implements OnInit {

  deck: FlashcardDeck;
  currentCardIndex: number;
  showQuestion: boolean;
  refresh: boolean;
  cardOrder: number[];

  constructor(private deckserv: FlashcardDeckService, private router: Router) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
    this.refresh = false;
  }

  ngOnInit(): void {
    this.deckserv.currentActiveDeck.subscribe(deck => {
      this.deck = deck;
      // Populate cards if not already populated
      if (deck.cards.length == 0) this.deck.populateCards(true);
      // Start cardOrder in sequential order
      this.cardOrder = [...Array(this.deck.cards.length).keys()];
    });
  }

  deleteDeck(): void {
    this.deckserv.removeDeck(this.deck);
    this.router.navigateByUrl("/dashboard");
  }

  flipCard(): void {
    this.showQuestion = !this.showQuestion;
  }

  nextCard(): void {
    if (++this.currentCardIndex >= this.deck.cards.length) {
      this.currentCardIndex -= this.deck.cards.length;
    }
    this.showQuestion = true;
  }

  prevCard(): void {
    if (--this.currentCardIndex < 0) {
      this.currentCardIndex += this.deck.cards.length;
    }
    this.showQuestion = true;
  }

  refreshDeck(): void {
    this.refresh = !this.refresh;
    this.deck.populateCards(true);
    if (this.currentCardIndex == this.deck.cards.length - 1) {
      this.currentCardIndex = 0;
    }
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
    this.cardOrder = [...Array(this.deck.cards.length).keys()];
    this.showQuestion = true;
  }

}
