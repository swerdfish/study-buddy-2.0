package com.studybuddy.repository;

import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@SpringBootTest
@ContextConfiguration(classes = SpreadsheetInfoRepo.class)
public class SpreadsheetInfoRepo {
	
	@Mock
	private SpreadsheetInfoRepo ssiRepo;
	
	private SpreadsheetInfo ssInfo;
	private User user;
	
	public SpreadsheetInfoRepo() {
		this.user = new User(0, "test@test.com", "Tessa", "Testerson");
//		this.ssInfo = new SpreadsheetInfo(spreadsheetId, user, queCol, ansCol, headerRows, publicAccess)
	}

}
