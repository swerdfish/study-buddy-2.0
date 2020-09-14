import { deckReducer, initialDeckState } from './deck.reducer';

describe('Deck Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = deckReducer(initialDeckState, action);

      expect(result).toBe(initialDeckState);
    });
  });
});
