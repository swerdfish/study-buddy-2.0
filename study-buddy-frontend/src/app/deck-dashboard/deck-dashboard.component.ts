import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService } from '../flashcard-deck.service';
import { FlashcardDeck } from '../model/flashcard-deck';

@Component({
  selector: 'app-deck-dashboard',
  templateUrl: './deck-dashboard.component.html',
  styleUrls: ['./deck-dashboard.component.css']
})
export class DeckDashboardComponent implements OnInit {

  decks: FlashcardDeck[];

  constructor(private deckserv: FlashcardDeckService) {
  }

  ngOnInit(): void {
    this.deckserv.currentDecks.subscribe(decks => this.decks = decks);
  }

}
