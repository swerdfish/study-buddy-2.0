import { Injectable } from '@angular/core';

import * as credKey from '../../../../sheets-cred-key_studyBuddy.json';
import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  // public authSubject: Subject<boolean> = new Subject();
  public googleApi: Observable<any> = new Observable(observer =>
    gapi.load('client:auth2', value => {
      observer.next(value);
      observer.complete();
    })
  );
  public isClientInitialized: boolean = false;
  public isAuth2Initialized: boolean = false;

  constructor() {
    this.loadScript();
    this.googleApi.subscribe(() => {
      gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      }).then(() => this.isClientInitialized = true);
    });
    this.googleApi.subscribe(() => {
      gapi.auth2.init({
        client_id: credKey.client_id,
        scope: credKey.scopes.join(" ")
      }).then(() => this.isAuth2Initialized = true);
    });
  }

  getAllSheetInfo(spreadsheetId: string) {
    return this.googleApi.pipe(
      flatMap(() => from(this.initGapiClient())),
      flatMap(() => from(this.getAllSheets(spreadsheetId)))
    );
  }

  getAllValues(spreadsheetId: string) {
    return from(gapi.client.init({
      apiKey: credKey.api_key,
      clientId: credKey.client_id,
      discoveryDocs: credKey.discovery_docs,
      scope: credKey.scopes.join(" ")
    }).then(() => gapi.client.sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId
    }))).pipe(
      flatMap(response => new Observable(observer => {
        for (let sheet of response.result.sheets) {
          this.getSheetValues(spreadsheetId, `${sheet.properties.title}`).then(
            resp => {
              observer.next(resp.result.values);
            });
        }
      }))
    );
  }

  getValues(spreadsheetId: string, rangeA1: string): Observable<gapi.client.Response<gapi.client.sheets.ValueRange>> {
    return this.googleApi.pipe(
      flatMap(() => from(this.initGapiClient())),
      flatMap(() => from(this.getSheetValues(spreadsheetId, rangeA1)))
    )
  }

  isGoogleUserSignedIn(): Observable<any> {
    return from(gapi.auth2.init({
      client_id: credKey.client_id,
      scope: credKey.scopes.join(" ")
    }).then(
      () => gapi.auth2.getAuthInstance()
    ).then(
      googleAuth => googleAuth.isSignedIn.get()
    ));
  }

  async initGapiClient() {
    if (this.isClientInitialized) {
      return null;
    } else {
      let p = await gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      });
      this.isClientInitialized = true;
      return p;
    }
  }

  async getSheetValues(spreadsheetId: string, range: string) {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    })
  }

  async getAllSheets(spreadsheetId: string) {
    return gapi.client.sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId
    });
  }

  loadScript() {
    let script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js?onload=initGapi';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

}
