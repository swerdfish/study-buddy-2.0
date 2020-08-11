import { Component, OnInit, NgZone } from '@angular/core';

import { GoogleApiService } from 'src/app/google-api.service';

@Component({
  selector: 'app-test-sheet',
  templateUrl: './test-sheet.component.html',
  styleUrls: ['./test-sheet.component.css']
})
export class TestSheetComponent implements OnInit {

  isSignedIn = false;
  header: string[];
  output: string[][];
  testString: string;
  spreadsheetId: string = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  rangeA1: string = 'Class Data';
  sheetData;

  constructor(private zone: NgZone, private gserv: GoogleApiService) {
    this.gserv.getValues(this.spreadsheetId, this.rangeA1).subscribe(response => {
      this.zone.run(() => {
        this.header = response.result.values[0];
        this.output = response.result.values;
        this.output.shift();
      })
    })

    this.gserv.getAllSheetInfo(this.spreadsheetId).subscribe(response => {
      this.sheetData = response.result.sheets;
      console.log(this.sheetData);
    })
  }

  ngOnInit(): void {
  }

}
