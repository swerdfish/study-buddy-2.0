import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';
import { FlashcardDeck } from './model/flashcard-deck';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckService {

  private deckSource = new BehaviorSubject<FlashcardDeck[]>([]);
  currentDecks = this.deckSource.asObservable();

  constructor(private gserv: GoogleApiService) { }

  changeDecks(decks: FlashcardDeck[]) {
    this.deckSource.next(decks);
  }

  addDeck(deck: FlashcardDeck): void {
    let decks: FlashcardDeck[] = this.deckSource.value;
    decks.push(deck);
    this.deckSource.next(decks);
  }

  addDecks(decksToAdd: Array<FlashcardDeck>): void {
    let decks: FlashcardDeck[] = this.deckSource.value;
    this.deckSource.next(decks.concat(decksToAdd));
  }
}
