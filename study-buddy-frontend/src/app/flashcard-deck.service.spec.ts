import { TestBed } from '@angular/core/testing';

import { FlashcardDeckService } from './flashcard-deck.service';

describe('FlashcardDeckService', () => {
  let service: FlashcardDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
