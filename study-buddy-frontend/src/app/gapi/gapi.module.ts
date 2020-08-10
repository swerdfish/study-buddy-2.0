import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi/lib/src';
import { TestSheetComponent } from './test-sheet/test-sheet.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: '274047880448-v1c8r2381n7v02fkv3kuteckdu0l0g48.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'redirect',
  redirect_uri: 'https://ng-gapi-example.stackblitz.io/redirect',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ].join(' ')
}

@NgModule({
  declarations: [TestSheetComponent],
  imports: [
    CommonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  exports: [
    TestSheetComponent
  ]
})
export class GapiModule { }
