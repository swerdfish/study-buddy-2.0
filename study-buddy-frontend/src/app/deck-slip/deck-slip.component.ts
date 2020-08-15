import { Component, OnInit, Input } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckService } from '../flashcard-deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-slip',
  templateUrl: './deck-slip.component.html',
  styleUrls: ['./deck-slip.component.css']
})
export class DeckSlipComponent implements OnInit {

  @Input() deck: FlashcardDeck;
  refresh: boolean;

  constructor(private deckserv: FlashcardDeckService, private router: Router) {
    this.refresh = false;
  }

  ngOnInit(): void {
  }

  viewDeck() {
    // this.deckserv.currentActiveDeck.subscribe(deck => console.log(deck));
    this.deckserv.changeActiveDeck(this.deck);
    this.router.navigateByUrl('/view');
    // this.deckserv.currentActiveDeck.subscribe(deck => console.log(deck));
  }

  refreshDeck() {
    this.refresh = true;
    this.deck.populateCards(true);
    this.refresh = false;
  }

  deleteDeck() {
    console.log("Delete deck.")
    this.deckserv.removeDeck(this.deck);
  }

}
