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

  // spreadsheet: GoogleSpreadsheet;
  // worksheet: GoogleSpreadsheetWorksheet;

  constructor(private zone: NgZone, private gserv: GoogleApiService) {
    // this.gserv.googleApi.pipe(
    //   map(() => from(
    //     gapi.client.init({
    //       apiKey: credKey.api_key,
    //       clientId: credKey.client_id,
    //       discoveryDocs: credKey.discovery_docs,
    //       scope: credKey.scopes.join(" ")
    //     }))
    //   )
    // ).pipe(
    //   map(() => from(
    //     gapi.client.sheets.spreadsheets.values.get({
    //       spreadsheetId: this.spreadsheetId,
    //       range: this.rangeA1
    //     }))
    //   )
    // ).subscribe(result =>
    //   console.log(result)
    // );

    // this.gserv.googleApi.pipe(
    //   flatMap(() => from(this.gserv.initGapiClient())),
    //   flatMap(() => from(this.gserv.getSheetValues(this.spreadsheetId, this.rangeA1)))
    // ).subscribe(response => {
    //   this.zone.run(() => {
    //     this.output = response.result.values;
    //     console.log(this.output);
    //   })
    // })

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

    // this.gserv.googleApi.subscribe(() => {
    //   if (this.gserv.isApiInitialized) {
    //     console.log("initialized");
    //     this.gserv.getSheetValues(this.spreadsheetId, this.rangeA1)
    //       .then(response => this.zone.run(() => {
    //         this.output = response.result.values;
    //       }))
    //     this.gserv.getAllSheets(this.spreadsheetId).then(response => this.zone.run(() => {
    //       this.sheetData = response.result.sheets;
    //       console.log(this.sheetData);
    //     }))
    //   } else {
    //     console.log('about to be initialized');
    //     let initGapi = from(this.gserv.initGapiClient());
    //     initGapi.subscribe(() => {
    //       this.gserv.getSheetValues(this.spreadsheetId, this.rangeA1)
    //         .then(response => this.zone.run(() => {
    //           this.output = response.result.values;
    //         }));
    //     });
    //     initGapi.subscribe(() => {
    //       this.gserv.getAllSheets(this.spreadsheetId)
    //         .then(response => this.zone.run(() => {
    //           this.sheetData = response.result.sheets;
    //           console.log(this.sheetData);
    //         }));
    //     });
    //   }
    // })

    // this.gserv.googleApi.subscribe(() => {
    //   if (this.gserv.isApiInitialized) {
    //     console.log("initialized");
    //     gapi.client.sheets.spreadsheets.values.get({
    //       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    //       range: 'Class Data!A2:E'
    //     }).then(response => zone.run(() => {
    //       this.output = response.result.values;
    //     }));
    //   } else {
    //     console.log("will be initialized");
    //     gapi.client.init({
    //       apiKey: credKey.api_key,
    //       clientId: credKey.client_id,
    //       discoveryDocs: credKey.discovery_docs,
    //       scope: credKey.scopes.join(" ")
    //     }).then(() => {
    //       gapi.client.sheets.spreadsheets.values.get({
    //         spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    //         range: 'Class Data!A2:E'
    //       }).then(response => zone.run(() => {
    //         this.output = response.result.values;
    //         console.log(this.output);
    //       }));
    //     });
    //   }
    // })

    // const loadGapi = new Observable(observer => {
    //   gapi.load('client:auth2', value => {
    //     observer.next(value);
    //     observer.complete();
    //   })
    // })
    // loadGapi.subscribe(() => {
    //   gapi.client.init({
    //     apiKey: credKey.api_key,
    //     clientId: credKey.client_id,
    //     discoveryDocs: credKey.discovery_docs,
    //     scope: credKey.scopes.join(" ")
    //   }).then(() => {
    //     console.log(this.testString);
    //     this.testString = "Hi";
    //     console.log(this.testString);
    //     gapi.client.sheets.spreadsheets.values.get({
    //       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    //       range: 'Class Data!A2:E'
    //     }).then(response => zone.run(() => {
    //       this.output = response.result.values;
    //       console.log(this.output);
    //     }))
    //   })
    // });
    // gapi.load('client:auth2', () => {
    //   gapi.client.init({
    //     apiKey: credKey.api_key,
    //     clientId: credKey.client_id,
    //     discoveryDocs: credKey.discovery_docs,
    //     scope: credKey.scopes.join(" ")
    //   }).then(() => {
    //     gapi.client.sheets.spreadsheets.values.get({
    //       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    //       range: 'Class Data!A2:E'
    //     }).then(response => {
    //       this.output = response.result.values;
    //       console.log(this.output);
    //     })
    //   })
    // });
    //this.handleClientLoad();
  }

  ngOnInit(): void {
  }

}
