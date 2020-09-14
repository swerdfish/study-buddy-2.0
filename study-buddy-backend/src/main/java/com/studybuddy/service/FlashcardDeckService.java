package com.studybuddy.service;

import java.util.List;

import com.studybuddy.model.FlashcardDeck;

public interface FlashcardDeckService {
	
	// Create
	public FlashcardDeck createFlashcardDeck(FlashcardDeck fDeck);
	public List<FlashcardDeck> createFlashcardDecks(List<FlashcardDeck> fDecks);
	// Read
	public FlashcardDeck getFlashcardDeckByFid(int fid);
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
	public boolean existsAllByFidList(List<Integer> fids);
	public boolean existsByFid(int fid);

}
