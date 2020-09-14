package com.studybuddy.service;

import java.util.List;

import com.studybuddy.model.FlashcardDeck;

public interface FlashcardDeckService {
	
	// Create
	public FlashcardDeck createFlashcardDeck(FlashcardDeck fDeck);
	public List<FlashcardDeck> createFlashcardDecks(List<FlashcardDeck> fDecks);
	// Read
	public FlashcardDeck getFlashcardDeckByFdid(int fdid);
	public List<FlashcardDeck> getFlashcardDecksByUid(String uid);
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetId(String spreadsheetId);
	public List<FlashcardDeck> getFlashcardDecksBySpreadsheetIdOwnedByUid(String spreadsheetId, String uid);
	// Update
	public FlashcardDeck updateFlashcardDeck(FlashcardDeck fDeck);
	public List<FlashcardDeck> updateFlashcardDecks(List<FlashcardDeck> fDecks);
	// Delete
	public void deleteFlashcardDeck(FlashcardDeck fDeck);
	public void deleteFlashcardDecks(List<FlashcardDeck> fDeckList);
	// Exists
	public boolean existsAllByFdidList(List<Integer> fdids);
	public boolean existsByFdid(int fdid);

}
