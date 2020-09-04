package com.studybuddy.service;

import java.util.List;

import com.studybuddy.model.FlashcardDeck;

public interface FlashcardDeckService {
	
	// Create
	public FlashcardDeck createFlaschardDeck(FlashcardDeck fDeck);
	// Read
	public FlashcardDeck getFlashcardDeckByFid(int fid);
	public List<FlashcardDeck> getFlashcardDecksByUid(String uid);
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetId(String spreadsheetId);
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetIdOwnedByUid(String spreadsheetId, String uid);
	// Update
	public FlashcardDeck updateFlashcardDeck(FlashcardDeck fDeck);
	// Delete
	public void deleteFlashcardDeck(FlashcardDeck fDeck);
	public void deleteFlashcardDecks(List<FlashcardDeck> fDeckList);

}
