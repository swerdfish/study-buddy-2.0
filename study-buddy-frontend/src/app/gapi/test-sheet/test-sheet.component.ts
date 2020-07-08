import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'ng-gapi/lib/src';

@Component({
  selector: 'app-test-sheet',
  templateUrl: './test-sheet.component.html',
  styleUrls: ['./test-sheet.component.css']
})
export class TestSheetComponent implements OnInit {

  constructor(private gapiService: GoogleApiService) {
    this.gapiService.onLoad().subscribe(loaded => console.log(loaded));
    console.log(this.gapiService.getConfig());
  }

  ngOnInit(): void {
  }

}
