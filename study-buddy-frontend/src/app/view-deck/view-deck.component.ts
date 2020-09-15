import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActiveDeck } from '../store';
import * as deckActions from '../store/actions/deck.actions';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})
export class ViewDeckComponent implements OnInit {

  getActiveDeck: Observable<FlashcardDeck>;
  deck: FlashcardDeck;
  currentCardIndex: number;
  showQuestion: boolean;
  refresh: boolean;
  cardOrder: number[];

  constructor(
    private router: Router,
    private store: Store) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
    this.refresh = false;
    this.getActiveDeck = this.store.select(selectActiveDeck);
  }

  ngOnInit(): void {
    this.getActiveDeck.subscribe(activeDeck => {
      this.deck = activeDeck;
      // Populate cards if not already populated
      if (this.deck.cards.length == 0) this.deck.populateCards(true);
      // Start cardOrder in sequential order
      this.cardOrder = [...Array(this.deck.cards.length).keys()];
    })
  }

  deleteDeck(): void {
    this.store.dispatch(deckActions.deleteActiveDeck());
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
