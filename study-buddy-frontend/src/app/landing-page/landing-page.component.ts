import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckService } from '../flashcard-deck.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  decks: FlashcardDeck[];

  constructor(private deckserv: FlashcardDeckService) { }

  ngOnInit(): void {
    this.deckserv.currentDecks.subscribe(decks => this.decks = decks);
  }

}
