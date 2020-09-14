import { TestBed } from '@angular/core/testing';

import { FlashcardDeckServiceDeprecated } from './flashcard-deck-deprecated.service';

describe('FlashcardDeckService', () => {
  let service: FlashcardDeckServiceDeprecated;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardDeckServiceDeprecated);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
