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
  client_id: '',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'redirect',
  redirect_uri: 'https://ng-gapi-example.stackblitz.io/redirect',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile'
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
