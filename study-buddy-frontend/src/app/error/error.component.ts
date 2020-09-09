import { Component, OnInit } from '@angular/core';
import { AuthState } from '../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  getState: Observable<AuthState>;
  error: string;

  constructor(private store: Store) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state: AuthState) => {
      this.error = state.error;
    })
  }

}
