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
    (state, { decks }) => {
      let deckIds: string[] = decks.map(deck => deck.deckId);
      return {
        ...state,
        selectedDecks: decks.concat(
          state.selectedDecks.filter(
            sdeck => !deckIds.includes(sdeck.deckId)
          )
        )
      };
    }
  ),
  on(
    deckActions.addDecksToUserDecks,
    deckActions.populateCardsUpdateDecksSuccessful,
    (state, { decks }) => {
      let deckIds: string[] = decks.map(deck => deck.deckId);
      return {
        ...state,
        userDecks: decks.concat(
          state.userDecks.filter(
            udeck => !deckIds.includes(udeck.deckId)
          )
        )
      };
    }
  ),
  on(
    deckActions.addToSelectedDecks,
    (state, { deck }) => ({
      ...state,
      selectedDecks: [
        ...state.selectedDecks.filter(sdeck => sdeck.deckId != deck.deckId),
        deck
      ]
    })
  ),
  on(
    deckActions.addToUserDecks,
    (state, { deck }) => ({
      ...state,
      userDecks: [
        ...state.userDecks.filter(udeck => udeck.deckId != deck.deckId),
        deck
      ]
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
      let selectedDeckIds: string[] = state.selectedDecks.map(
        deck => deck.deckId);
      let selectedDecks: FlashcardDeck[] = decks.filter(
        deck => selectedDeckIds.includes(deck.deckId));
      let activeDeck: FlashcardDeck = null;
      if (state.activeDeck) {
        for (let deck of decks) {
          if (deck.deckId == state.activeDeck.deckId) {
            activeDeck = deck;
            break;
          }
        }
      }
      return {
        ...state,
        userDecks: decks,
        selectedDecks: selectedDecks,
        activeDeck: activeDeck
      };
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
    deckActions.deleteUserDecks,
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
   * The delete deck(s) actions will call the backend in effects and
   * update the token, here it will change state accordingly.
   */
  on(
    deckActions.deleteActiveDeck,
    (state: DeckState) => {
      let deckToRemove = state.activeDeck;
      state.activeDeck = null;
      state.selectedDecks = state.selectedDecks.filter(
        sdeck => sdeck.deckId != deckToRemove.deckId
      );
      state.userDecks = state.userDecks.filter(
        udeck => udeck.deckId != deckToRemove.deckId
      );
      return state;
    }
  ),
  // deckActions.deleteDeck state update: see removeFromUserDecks
  on(
    deckActions.deleteDeckById,
    (state: DeckState, { deckId }) => ({
      ...state,
      userDecks: state.userDecks.filter(
        (fDeck: FlashcardDeck) => fDeck.deckId != deckId
      ),
      selectedDecks: state.selectedDecks.filter(
        (sDeck: FlashcardDeck) => sDeck.deckId != deckId
      ),
      activeDeck: state.activeDeck.deckId == deckId ? null : state.activeDeck
    })
  ),
  on(
    deckActions.deleteSelectedDecks,
    (state: DeckState) => {
      let deckIdsToRemove: string[] = state.selectedDecks.map(deck => deck.deckId);
      state.selectedDecks = [];
      state.userDecks = state.userDecks.filter(
        udeck => !deckIdsToRemove.includes(udeck.deckId)
      );
      if (deckIdsToRemove.includes(state.activeDeck.deckId)) state.activeDeck = null;
      return state;
    }
  ),
  // for deckActions.deleteUserDecks see deckActions.clearAllDecks
  // Fetch Action
  /*
   * The fetchUserDecks action will take place only in effects and
   * then call fetchUserDecksSuccessful to update state accordingly.
   */
  // Fetch Successful Action
  on(
    deckActions.fetchUserDecksSuccessful,
    (state: DeckState, { userDecks }) => {
      console.log(userDecks);
      let selectedDeckIds: string[] = state.selectedDecks.map(deck => deck.deckId);
      let selectedDecks: FlashcardDeck[] = userDecks.filter(udeck => selectedDeckIds.includes(udeck.deckId));
      let activeDeck: FlashcardDeck = null;
      if (state.activeDeck) {
        for (let udeck of userDecks) {
          if (udeck.deckId == state.activeDeck.deckId) {
            activeDeck = udeck;
            break;
          }
        }
      }
      return {
        ...state,
        userDecks: userDecks,
        selectedDecks: selectedDecks,
        activeDeck: activeDeck
      };
    }
  ),
  // Populate Actions
  /*
   * Populate card actions deal with the google api and take place
   * mostly in effects in the google sheets api backend.
   */
  on(
    deckActions.populateCardsUpdateDecks,
    (state: DeckState, { decks }) => {
      let deckIds: string[] = decks.map(deck => deck.deckId);
      let unchangedUserDecks: FlashcardDeck[] = state.userDecks.filter(udeck => !deckIds.includes(udeck.deckId));
      let selectedDeckIds: string[] = state.selectedDecks.map(sdeck => sdeck.deckId);
      let newSelectedDecks: FlashcardDeck[] = [];
      for (let deck of decks) {
        if (selectedDeckIds.includes(deck.deckId)) {
          newSelectedDecks.push(deck);
        }
      }
      for (let unchUdeck of unchangedUserDecks) {
        if (selectedDeckIds.includes(unchUdeck.deckId)) {
          newSelectedDecks.push(unchUdeck);
        }
      }
      // let unchangedSelectedDecks: FlashcardDeck[] = state.selectedDecks.filter(sdeck => !deckIds.includes(sdeck.deckId));
      let newActiveDeck: FlashcardDeck = null;
      if (state.activeDeck) {
        for (let deck of decks) {
          if (deck.deckId == state.activeDeck.deckId) {
            newActiveDeck = deck;
            break;
          }
        }
      }
      return {
        ...state,
        userDecks: unchangedUserDecks.concat(decks),
        selectedDecks: newSelectedDecks,
        activeDeck: newActiveDeck
      }
    }
  ),
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
      activeDeck: state.activeDeck && state.activeDeck.deckId == deck.deckId ? null : state.activeDeck
    })
  ),
  on(
    deckActions.removeFromUserDecks,
    deckActions.deleteDeck,
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
  // Update Actions
  /*
   * The only update action so far only updates the frontend (use save to update 
   * the backend).
   */
  on(
    deckActions.updateDeck,
    (state, { deck }) => {
      let sanitizedDeck = new FlashcardDeck(deck.spreadsheetInfo.spreadsheetId, deck.title, deck.spreadsheetInfo.queCol, deck.spreadsheetInfo.ansCol, deck.spreadsheetInfo.headerRows, deck.deckId, deck.color);
      sanitizedDeck.cards = [...deck.cards];
      console.log(deck);
      console.log(state.userDecks.map(
        udeck => udeck.deckId == deck.deckId ? sanitizedDeck : udeck));
      return {
        ...state,
        userDecks: state.userDecks.map(
          udeck => udeck.deckId == deck.deckId ? sanitizedDeck : udeck),
        selectedDecks: state.selectedDecks.map(
          sdeck => sdeck.deckId == deck.deckId ? sanitizedDeck : sdeck),
        activeDeck: state.activeDeck && state.activeDeck.deckId == deck.deckId ? sanitizedDeck : state.activeDeck
      };
    }
  )
)