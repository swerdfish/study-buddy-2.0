import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../google-api.service';
import { map } from 'rxjs/operators';

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
  submitted: boolean = false;
  deckNames;
  errorCode: number;

  constructor(private gserv: GoogleApiService) {
    this.queCol = "A";
    this.ansCol = "B";
  }

  ngOnInit(): void {
  }

  previewDecks() {
    let temp = this.spreadsheetUrl.split("docs.google.com/spreadsheets/d/");
    this.spreadsheetId = temp[temp.length - 1].split("\/")[0];
    console.log(this.spreadsheetId);
    this.gserv.getAllSheetInfo(this.spreadsheetId).subscribe(
      response => { console.log(response); },
      err => { this.errorCode = err.status });
  }

}
