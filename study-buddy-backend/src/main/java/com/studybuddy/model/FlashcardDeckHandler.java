package com.studybuddy.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
public class FlashcardDeckHandler {

	private String deckId;
	private User user;
	private SpreadsheetInfo spreadsheetInfo;
	private String color;
	private String title;

}
