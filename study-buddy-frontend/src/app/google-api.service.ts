import { Injectable, NgZone } from '@angular/core';

import * as credKey from '../../../../sheets-cred-key_studyBuddy.json';
import { Subject, Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  public authSubject: Subject<boolean> = new Subject();
  public googleApi: Observable<any> = new Observable(observer =>
    gapi.load('client:auth2', value => {
      observer.next(value);
      observer.complete();
    })
  );
  public isApiInitialized: boolean = false;

  constructor(private zone: NgZone) {
    this.loadScript();
    this.googleApi.subscribe(() => {
      gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      }).then(() => this.isApiInitialized = true);
    });
  }

  getValues(spreadsheetId: string, rangeA1: string): Observable<gapi.client.Response<gapi.client.sheets.ValueRange>> {
    return this.googleApi.pipe(
      flatMap(() => from(this.initGapiClient())),
      flatMap(() => from(this.getSheetValues(spreadsheetId, rangeA1)))
    )
  }

  getAllSheetInfo(spreadsheetId: string) {
    return this.googleApi.pipe(
      flatMap(() => from(this.initGapiClient())),
      flatMap(() => from(this.getAllSheets(spreadsheetId)))
    );
  }

  private async initGapiClient() {
    if (this.isApiInitialized) {
      return null;
    } else {
      let p = await gapi.client.init({
        apiKey: credKey.api_key,
        clientId: credKey.client_id,
        discoveryDocs: credKey.discovery_docs,
        scope: credKey.scopes.join(" ")
      });
      this.isApiInitialized = true;
      return p;
    }
  }

  private async getSheetValues(spreadsheetId: string, range: string) {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    })
  }

  private async getAllSheets(spreadsheetId: string) {
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
