import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-sheet',
  templateUrl: './test-sheet.component.html',
  styleUrls: ['./test-sheet.component.css']
})
export class TestSheetComponent implements OnInit {

  // Client ID and API key from the Developer Console
  CLIENT_ID = '274047880448-v1c8r2381n7v02fkv3kuteckdu0l0g48.apps.googleusercontent.com';
  API_KEY = 'AIzaSyBj4QkG4I7D2P1NiovTMpspWnoXtzD0XRc';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  isSignedIn = false;

  constructor() {
    this.handleClientLoad();
    // this.gapiService.onLoad().subscribe(
    //   loaded => {
    //     console.log(loaded);
    //     this.listMajors();
    //   }
    // );
    // console.log(this.gapiService.getConfig());
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
      var range = response.result;
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
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        this.listMajors();
      }, function (error) {
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
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES
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
