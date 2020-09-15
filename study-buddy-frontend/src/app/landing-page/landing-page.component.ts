import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserDecks } from '../store';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  getUserDecks: Observable<FlashcardDeck[]>;
  decks: FlashcardDeck[];

  constructor(private store: Store) {
    this.getUserDecks = this.store.select(selectUserDecks);
  }

  ngOnInit(): void {
    this.getUserDecks.subscribe(userDecks => {
      this.decks = userDecks;
    })
  }

}
