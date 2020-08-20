import { FlashcardDeck } from './flashcard-deck';

describe('FlashcardDeck', () => {
  it('should create an instance', () => {
    expect(new FlashcardDeck("1N5NjMvqfpCFYrj71UlHmsdnp98XwZbwZwwuetnExHzY", "Typescript", "A", "B", null)).toBeTruthy();
  });
});
