import { createReducer, on } from '@ngrx/store';
import { FlashcardDeck } from 'src/app/model/flashcard-deck';
import * as deckActions from '../actions/deck.actions';


export const deckFeatureKey = 'deck';

export interface DeckState {
  userDecks: FlashcardDeck[];
  selectedDecks: FlashcardDeck[];
  activeDeck: FlashcardDeck;
}

export const initialDeckState: DeckState = {
  userDecks: [],
  selectedDecks: [],
  activeDeck: null
}

export const deckReducer = createReducer(
  initialDeckState,
  // Add Actions
  /*
   * Add deck(s) actions add 1 or more decks to selected decks or
   * user decks. (Frontend only.)
   */
  on(
    deckActions.addDecksToSelectedDecks,
    (state, { decks }) => ({
      ...state,
      selectedDecks: state.selectedDecks.concat(decks)
    })
  ),
  on(
    deckActions.addDecksToUserDecks,
    (state, { decks }) => ({
      ...state,
      userDecks: state.userDecks.concat(decks)
    })
  ),
  on(
    deckActions.addToSelectedDecks,
    (state, { deck }) => ({
      ...state,
      selectedDecks: [...state.selectedDecks, deck]
    })
  ),
  on(
    deckActions.addToUserDecks,
    (state, { deck }) => ({
      ...state,
      userDecks: [...state.userDecks, deck]
    })
  ),
  // Change Actions
  /*
   * Change deck(s) actions change either the active, selected, or
   * user decks. Only changes to the user decks cascade to selected
   * decks and the active deck. (Frontend only.)
   */
  on(
    deckActions.changeActiveDeck,
    (state, { deck }) => ({
      ...state,
      activeDeck: deck
    })
  ),
  on(
    deckActions.changeSelectedDecks,
    (state, { decks }) => ({
      ...state,
      selectedDecks: decks,
    })
  ),
  on(
    deckActions.changeUserDecks,
    (state, { decks }) => {
      state.userDecks = decks;
      let selectedDeckIds: string[] = state.selectedDecks.map(deck => deck.deckId);
      state.selectedDecks = decks.filter(deck => selectedDeckIds.includes(deck.deckId));
      for (let deck of decks) {
        if (deck.deckId == state.activeDeck.deckId) {
          state.activeDeck = deck;
          return state;
        }
      }
      state.activeDeck = null;
      return state;
    }
  ),
  // Clear Actions
  /*
   * Clear deck(s) actions update the frontend only, resetting the
   * corresponding property(ies) of the store.
   */
  on(
    deckActions.clearActiveDeck,
    (state) => ({
      ...state,
      activeDeck: null
    })
  ),
  on(
    deckActions.clearAllDecks,
    () => initialDeckState
  ),
  on(
    deckActions.clearSelectedDecks,
    (state) => ({
      ...state,
      selectedDecks: []
    })
  ),
  // Delete Actions
  /* 
   * The delete deck(s) actions will take place only in effects and
   * update the backend, then call the appropriate actions to update
   * state (i.e. the corresponding clear or remove actions).
   */
  // Fetch Action
  /*
   * The fetchUserDecks action will take place only in effects and
   * then call changeUserDecks.
   */
  // Remove Actions
  /*
   * The remove deck(s) actions remove from the frontend only. 
   * Removals from user decks cascade down to selected decks and
   * the active deck.
   */
  on(
    deckActions.removeDecksFromSelectedDecks,
    (state, { decks }) => {
      let idsOfDecksToRemove: string[] = decks.map(deck => deck.deckId);
      state.selectedDecks = state.selectedDecks.filter(
        (deck: FlashcardDeck) => !idsOfDecksToRemove.includes(deck.deckId));
      return state;
    }
  ),
  on(
    deckActions.removeDecksFromUserDecks,
    (state, { decks }) => {
      let idsOfDecksToRemove: string[] = decks.map(deck => deck.deckId);
      state.userDecks = state.userDecks.filter(
        (deck: FlashcardDeck) => !idsOfDecksToRemove.includes(deck.deckId));
      state.selectedDecks = state.selectedDecks.filter(
        (deck: FlashcardDeck) => !idsOfDecksToRemove.includes(deck.deckId));
      if (idsOfDecksToRemove.includes(state.activeDeck.deckId)) state.activeDeck = null;
      return state;
    }
  ),
  on(
    deckActions.removeFromSelectedDecks,
    (state, { deck }) => ({
      ...state,
      selectedDecks: state.selectedDecks.filter(
        (sDeck: FlashcardDeck) => sDeck.deckId != deck.deckId
      ),
      activeDeck: state.activeDeck.deckId == deck.deckId ? null : state.activeDeck
    })
  ),
  on(
    deckActions.removeFromUserDecks,
    (state, { deck }) => ({
      ...state,
      userDecks: state.userDecks.filter(
        (fDeck: FlashcardDeck) => fDeck.deckId != deck.deckId
      ),
      selectedDecks: state.selectedDecks.filter(
        (sDeck: FlashcardDeck) => sDeck.deckId != deck.deckId
      ),
      activeDeck: state.activeDeck.deckId == deck.deckId ? null : state.activeDeck
    })
  ),
  // Save Actions
  /*
   * Save deck(s) actions will take place only in effects to update the backend.
   */
)