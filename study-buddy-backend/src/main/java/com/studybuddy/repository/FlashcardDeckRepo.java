package com.studybuddy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@Repository
public interface FlashcardDeckRepo extends JpaRepository<FlashcardDeck, Integer> {
	
	public List<FlashcardDeck> findByUser_Uid(String uid);
	public List<FlashcardDeck> findBySpreadsheetInfo_SpreadsheetId(String spreadsheetId);
	public List<FlashcardDeck> findBySpreadsheetInfoAndUser(SpreadsheetInfo ssInfo, User user);

}
