import { createAction, props } from '@ngrx/store';
import { FlashcardDeck } from 'src/app/model/flashcard-deck';

export const addDecksToSelectedDecks = createAction(
  '[Deck] Add Decks to Selected Decks',
  props<{ decks: FlashcardDeck[] }>()
);

export const addDecksToUserDecks = createAction(
  '[Deck] Add Decks to User Decks',
  props<{ decks: FlashcardDeck[] }>()
)

export const addToSelectedDecks = createAction(
  '[Deck] Add to Selected Decks',
  props<{ deck: FlashcardDeck }>()
);

export const addToUserDecks = createAction(
  '[Deck] Add to User Decks',
  props<{ deck: FlashcardDeck }>()
);

export const changeActiveDeck = createAction(
  '[Deck] Change Active Deck',
  props<{ deck: FlashcardDeck }>()
);

export const changeSelectedDecks = createAction(
  '[Deck] Change Selected Decks',
  props<{ decks: FlashcardDeck[] }>()
);

export const changeUserDecks = createAction(
  '[Deck] Change User Decks',
  props<{ decks: FlashcardDeck[] }>()
);

export const clearActiveDeck = createAction(
  '[Deck] Clear Active Deck'
);

export const clearAllDecks = createAction(
  '[Deck] Clear All Decks'
);

export const clearSelectedDecks = createAction(
  '[Deck] Clear Selected Decks'
);

export const deleteActiveDeck = createAction(
  '[Deck] Delete Active Deck',
  props<{ token: string }>()
);

export const deleteSelectedDecks = createAction(
  '[Deck] Delete Selected Decks',
  props<{ token: string }>()
);

export const deleteUserDecks = createAction(
  '[Deck] Delete User Decks',
  props<{ token: string }>()
)

export const fetchUserDecks = createAction(
  '[Deck] Fetch User Decks',
  props<{ token: string }>()
);

export const removeDecksFromSelectedDecks = createAction(
  '[Deck] Remove Decks from Selected Decks',
  props<{ decks: FlashcardDeck[] }>()
);

export const removeDecksFromUserDecks = createAction(
  '[Deck] Remove Decks from User Decks',
  props<{ decks: FlashcardDeck[] }>()
);

export const removeFromSelectedDecks = createAction(
  '[Deck] Remove from Selected Decks',
  props<{ deck: FlashcardDeck }>()
);

export const removeFromUserDecks = createAction(
  '[Deck] Remove from User Decks',
  props<{ deck: FlashcardDeck }>()
);

export const saveActiveDeck = createAction(
  '[Deck] Save Active Deck',
  props<{ token: string }>()
);

export const saveSelectedDecks = createAction(
  '[Deck] Save Selected Decks',
  props<{ token: string }>()
);

export const saveUserDecks = createAction(
  '[Deck] Save User Decks',
  props<{ token: string }>()
);