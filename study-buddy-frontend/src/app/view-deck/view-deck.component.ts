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

  constructor(private deckserv: FlashcardDeckService, private router: Router) {
    this.currentCardIndex = 0;
    this.showQuestion = true;
    this.refresh = false;
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

  refreshDeck(): void {
    this.refresh = !this.refresh;
    this.deck.populateCards(true);
    this.refresh = !this.refresh;
  }

  deleteDeck(): void {
    this.deckserv.removeDeck(this.deck);
    this.router.navigateByUrl("/dashboard");
  }

}
