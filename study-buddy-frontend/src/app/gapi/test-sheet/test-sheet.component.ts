import { Component, OnInit, NgZone } from '@angular/core';

import * as credKey from '../../../../../../sheets-cred-key_studyBuddy.json';

import { Observable, from } from 'rxjs';
import { concatMap, flatMap, map, switchMap } from 'rxjs/operators';
import { GoogleApiService } from 'src/app/google-api.service';

// import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

//declare var gapi: any;

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

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message: string): void {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  listMajors(): void {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    }).then(response => {
      // this.output = response.result;
      var range = response.result;
      this.output = range.values;
      console.log(this.output);
      if (range.values.length > 0) {
        this.appendPre('Name, Major:');
        for (let i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          this.appendPre(row[0] + ', ' + row[4]);
        }
      } else {
        this.appendPre('No data found.');
      }
    },
      function (response) {
        this.appendPre('Error: ' + response.result.error.message);
      });
  }



  /**
    *  On load, called to load the auth2 library and API client library.
    */
  handleClientLoad() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        this.listMajors();
      }, function (error: any) {
        this.appendPre(JSON.stringify(error, null, 2));
      });
    });
  }

  /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
  initClient() {
    gapi.client.init({
      apiKey: credKey.api_key,
      clientId: credKey.client_id,
      discoveryDocs: credKey.discovery_docs,
      scope: credKey.scopes.join(" ")
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      this.authorizeButton.onclick = this.handleAuthClick;
      this.signoutButton.onclick = this.handleSignoutClick;
    }, function (error) {
      this.appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
    *  Called when the signed in status changes, to update the UI
    *  appropriately. After a sign-in, the API is called.
    */
  updateSigninStatus() {
    this.isSignedIn = !this.isSignedIn;
    if (this.isSignedIn) this.listMajors();
  }

  /**
    *  Sign in the user upon button click.
    */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        let oldSignIn = this.isSignedIn;
        this.isSignedIn = true;
        if (oldSignIn != this.isSignedIn) this.listMajors();
      });
  }

  /**
    *  Sign out the user upon button click.
    */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
      .then(() => this.isSignedIn = false);
  }


}
