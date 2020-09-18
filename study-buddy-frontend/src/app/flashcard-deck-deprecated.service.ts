import { Injectable } from '@angular/core';
import { FlashcardDeck } from './model/flashcard-deck';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckServiceDeprecated {

  private deckSource = new BehaviorSubject<FlashcardDeck[]>([]);
  currentDecks = this.deckSource.asObservable();
  private activeDeckSource = new BehaviorSubject<FlashcardDeck>(
    new FlashcardDeck("", "", "", "", null));
  currentActiveDeck = this.activeDeckSource.asObservable();
  private deckGroupSource = new BehaviorSubject<FlashcardDeck[]>([]);
  currentDeckGroup = this.deckGroupSource.asObservable();

  constructor() { }

  addDeck(deck: FlashcardDeck): void {
    let decks: FlashcardDeck[] = this.deckSource.value;
    decks.push(deck);
    this.deckSource.next(decks);
  }

  addDecks(decksToAdd: Array<FlashcardDeck>): void {
    let decks: FlashcardDeck[] = this.deckSource.value;
    this.deckSource.next(decks.concat(decksToAdd));
  }

  addDeckToGroup(groupDeck: FlashcardDeck): void {
    let groupDecks: FlashcardDeck[] = this.deckGroupSource.value;
    groupDecks.push(groupDeck);
    this.deckGroupSource.next(groupDecks);
  }

  addDecksToGroup(groupDecksToAdd: FlashcardDeck[]): void {
    let groupDecks: FlashcardDeck[] = this.deckGroupSource.value;
    this.deckGroupSource.next(groupDecks.concat(groupDecksToAdd));
  }

  changeActiveDeck(deck: FlashcardDeck) {
    this.activeDeckSource.next(deck);
  }

  changeDecks(decks: FlashcardDeck[]) {
    this.deckSource.next(decks);
  }

  changeDecksInGroup(groupDecks: FlashcardDeck[]) {
    this.deckGroupSource.next(groupDecks);
  }

  clearDecks(): void {
    this.changeDecks([]);
  }

  clearDecksInGroup(): void {
    this.changeDecksInGroup([]);
  }

  // refreshDeckGroup(deckId?: string): void {
  //   let deckGroup = this.deckGroupSource.value;
  //   if (deckId) {
  //     for (let d = 0; d < deckGroup.length; d++) {
  //       if (deckId == deckGroup[d].deckId) {
  //         deckGroup[d].populateCards(true);
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let d = 0; d < deckGroup.length; d++) {
  //       deckGroup[d].populateCards(true);
  //     }
  //   }
  //   this.changeDecksInGroup(deckGroup);
  // }

  removeDeck(deck: FlashcardDeck): void {
    let decks: FlashcardDeck[] = this.deckSource.value;
    let deckIndex: number;
    for (let d = 0; d < decks.length; d++) {
      if (decks[d].deckId == deck.deckId) {
        deckIndex = d;
        break;
      }
    }
    if (deckIndex > -1) {
      decks.splice(deckIndex, 1);
      this.changeDecks(decks);
      // Remove from active deck if it's there
      if (deck.deckId == this.activeDeckSource.value.deckId) {
        this.changeActiveDeck(new FlashcardDeck("", "", "", "", null));
      }
      // Remove from group deck if it's there
      // removeGroupDeck will do that check and delete it if it's there
      this.removeDeckFromGroup(deck);
    }
  }

  removeDeckFromGroup(deck: FlashcardDeck): void {
    let groupDecks: FlashcardDeck[] = this.deckGroupSource.value;
    let groupDeckIndex: number;
    for (let d = 0; d < groupDecks.length; d++) {
      if (groupDecks[d].deckId == deck.deckId) {
        groupDeckIndex = d;
        break;
      }
    }
    if (groupDeckIndex > -1) {
      groupDecks.splice(groupDeckIndex, 1);
      this.changeDecksInGroup(groupDecks);
      // No extra checks necessary, since the group is a construct
    }
  }

}
