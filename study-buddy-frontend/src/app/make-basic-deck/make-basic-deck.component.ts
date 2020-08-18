import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../google-api.service';
import { map, flatMap } from 'rxjs/operators';
import { FlashcardDeck } from '../model/flashcard-deck';
import { Flashcard } from '../model/flashcard';
import { FlashcardDeckService } from '../flashcard-deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-basic-deck',
  templateUrl: './make-basic-deck.component.html',
  styleUrls: ['./make-basic-deck.component.css']
})
export class MakeBasicDeckComponent implements OnInit {

  spreadsheetId: string;
  spreadsheetUrl: string;
  queCol: string;
  ansCol: string;
  decks: FlashcardDeck[];
  errorCode: number;
  errorMessage: string;
  headerPresent: boolean;
  headerRows: number;
  submitted: boolean;
  loading: boolean;

  constructor(private deckserv: FlashcardDeckService, private gserv: GoogleApiService, private router: Router) {
    this.queCol = "A";
    this.ansCol = "B";
    this.decks = [];
    this.headerPresent = false;
    this.headerRows = 0;
    this.submitted = false;
    this.loading = false;
  }

  ngOnInit(): void {
  }

  previewDecks() {
    this.loading = true;
    this.decks = [];
    let qThenA: boolean = true;;
    if (this.queCol == this.ansCol) {
      this.errorCode = -1;
      this.errorMessage = "Cannot use the same column for both questions and answers.";
      return;
    } else if (this.queCol > this.ansCol) {
      qThenA = false;
    }
    let temp = this.spreadsheetUrl.split("docs.google.com/spreadsheets/d/");
    this.spreadsheetId = temp[temp.length - 1].split("\/")[0];
    // console.log(this.spreadsheetId);

    this.gserv.getAllSheetInfo(this.spreadsheetId).subscribe(
      response => {
        // console.log(response);
        // Google Sheets will not let worksheets in the same spreadsheet share the same name.
        // let titles = {};
        // for (let sheet of response.result.sheets) {
        //   if (sheet.properties.title in titles) {
        //     throw new Error("Cannot have sheets with the same name.");
        //   } else {
        //     titles[sheet.properties.title] = 1;
        //   }
        // }
        for (let s = 0; s < response.result.sheets.length; s++) {
          let title = response.result.sheets[s].properties.title;
          this.gserv.getSheetValues(this.spreadsheetId,
            // `'${title}'!${this.queCol}:${this.queCol}, '${title}'!${this.ansCol}:${this.ansCol}`).then(
            `'${title}'!${this.queCol}:${this.ansCol}`).then(
              resp => {
                let deck = new FlashcardDeck(this.spreadsheetId, title, this.queCol, this.ansCol, this.gserv, this.headerRows);
                if (qThenA) {
                  for (let value of resp.result.values.slice(this.headerRows)) {
                    deck.cards.push(new Flashcard(value[0], value[value.length - 1]));
                  }
                } else {
                  for (let value of resp.result.values.slice(this.headerRows)) {
                    deck.cards.push(new Flashcard(value[value.length - 1], value[0]));
                  }
                }
                this.decks.push(deck);
                // console.log(this.decks);
              }
            ).catch(err => {
              this.errorCode = err.result.error.code;
              this.errorMessage = err.result.error.message;
            });
        }
        this.errorCode = undefined;
        this.submitted = true;
        this.loading = false;
      },
      err => {
        this.errorCode = err.status;
        this.loading = false;
      }
    );
  }

  createDecks() {
    this.deckserv.addDecks(this.decks);
    this.router.navigateByUrl('/dashboard');
  }
}