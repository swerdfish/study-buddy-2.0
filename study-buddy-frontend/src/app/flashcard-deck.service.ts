import { Injectable } from '@angular/core';
import { FlashcardDeck } from './model/flashcard-deck';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckService {

  private deckSource = new BehaviorSubject<FlashcardDeck[]>([]);
  currentDecks = this.deckSource.asObservable();
  private activeDeckSource = new BehaviorSubject<FlashcardDeck>(
    new FlashcardDeck("", "", "", "", null));
  currentActiveDeck = this.activeDeckSource.asObservable();

  constructor() { }

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

  changeActiveDeck(deck: FlashcardDeck) {
    this.activeDeckSource.next(deck);
  }
}
