import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeckEffects } from './deck.effects';

describe('DeckEffects', () => {
  let actions$: Observable<any>;
  let effects: DeckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeckEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
