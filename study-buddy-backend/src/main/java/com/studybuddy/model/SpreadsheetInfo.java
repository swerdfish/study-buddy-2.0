package com.studybuddy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
public class SpreadsheetInfo {
	
	@Id
	private String spreadsheetId;
	
	@ManyToOne
	private User user;
	
	@Column(name = "question_column")
	private String queCol;
	
	@Column(name = "answer_column")
	private String ansCol;
	
	private int headerRows;
	
	private boolean publicAccess;

	public static SpreadsheetInfo createTestSpreadsheetInfo() {
		return new SpreadsheetInfo("-", User.createTestUser("1"), "A", "B", 1, true);
	}
	
	public boolean checkIsTestSpreadsheetInfo() {
		return this.equals(createTestSpreadsheetInfo());
	}
}
