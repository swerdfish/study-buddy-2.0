package com.studybuddy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@Repository
public interface FlashcardDeckRepo extends JpaRepository<FlashcardDeck, Integer> {
	
	public List<FlashcardDeck> findByUser(User user);
	public List<FlashcardDeck> findBySpreadsheetInfo(SpreadsheetInfo ssInfo);

}
