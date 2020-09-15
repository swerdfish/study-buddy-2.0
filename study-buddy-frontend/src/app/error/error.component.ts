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

  getAuthState: Observable<AuthState>;
  error: string;

  constructor(private store: Store) {
    this.getAuthState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getAuthState.subscribe((state: AuthState) => {
      this.error = state.error;
    })
  }

}
