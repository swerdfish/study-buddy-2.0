package com.studybuddy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
public class FlashcardDeck {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int deckId;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "spreadsheet_info")
	private SpreadsheetInfo spreadsheetInfo;
	
	@Column(nullable = true)
	private String color;
	
	private String title;

	public static FlashcardDeck createTestFlashcardDeck() {
		return new FlashcardDeck(0, User.createTestUser("0"),
				SpreadsheetInfo.createTestSpreadsheetInfo(),
				"#FFFFFF", "Test Deck");
	}
	
	public boolean checkIsTestFlashcardDeck() {
		return this.equals(createTestFlashcardDeck());
	}
}
