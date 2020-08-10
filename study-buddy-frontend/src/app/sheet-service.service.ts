import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import * as credKey from '../../../../sheets-cred-key_studyBuddy.json';

@Injectable({
  providedIn: 'root'
})
export class SheetServiceService {

  constructor() {
    // Initialize gapi
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      })
    })
  }

  getSheetData(spreadsheetId: string, range?: string): Observable<gapi.client.Response<gapi.client.sheets.ValueRange>> {
    return from(gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    }));
  }

  authenticateUser(): Observable<gapi.auth2.GoogleUser> {
    return from(gapi.auth2.getAuthInstance().signIn());
  }
}
