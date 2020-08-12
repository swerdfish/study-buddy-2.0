import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestSheetComponent } from './gapi/test-sheet/test-sheet.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'test', component: TestSheetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
