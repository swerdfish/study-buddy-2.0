import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckService } from '../flashcard-deck.service';

@Component({
  selector: 'app-view-deck',
  templateUrl: './view-deck.component.html',
  styleUrls: ['./view-deck.component.css']
})
export class ViewDeckComponent implements OnInit {

  deck: FlashcardDeck;
  currentCardIndex: number;
  showQuestion: boolean;

  constructor(private deckserv: FlashcardDeckService) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
  }

  ngOnInit(): void {
    this.deckserv.currentActiveDeck.subscribe(deck => this.deck = deck);
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

  flipCard(): void {
    this.showQuestion = !this.showQuestion;
  }

}
