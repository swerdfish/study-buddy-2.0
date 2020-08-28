import { Component, OnInit } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';
import { FlashcardDeckService } from '../flashcard-deck.service';
// import { GoogleApiService } from '../google-api.service';
import { Store } from '@ngrx/store';
// import { GoogleLoginSuccess } from '../store/actions/auth.actions';
// import { User } from '../model/user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  decks: FlashcardDeck[];
  // user: User;
  // isSignedIn: boolean;

  constructor(private deckserv: FlashcardDeckService/*, private gapiserv: GoogleApiService*/, private store: Store) { }

  ngOnInit(): void {
    this.deckserv.currentDecks.subscribe(decks => this.decks = decks);
    // this.gapiserv.isGoogleUserSignedIn().subscribe(signedIn => this.isSignedIn = signedIn);
    // this.gapiserv.getGoogleAuthInstance().subscribe(googleAuth => {
    //   this.isSignedIn = googleAuth.isSignedIn.get();
    //   if (this.isSignedIn) {
    //     let profile = googleAuth.currentUser.get().getBasicProfile()
    //     this.user = {
    //       email: profile.getEmail(),
    //       firstName: profile.getGivenName(),
    //       lastName: profile.getFamilyName(),
    //       uid: "0"
    //     };
    //     this.store.dispatch(new GoogleLoginSuccess({
    //       user: this.user
    //     }));
    //   }
    // });
  }

}
