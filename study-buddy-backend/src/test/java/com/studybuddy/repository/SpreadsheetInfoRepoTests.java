package com.studybuddy.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;


import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@SpringBootTest
@ContextConfiguration(classes = SpreadsheetInfoRepo.class)
public class SpreadsheetInfoRepoTests {
	
	@Mock
	private SpreadsheetInfoRepo ssiRepo;
	
	private SpreadsheetInfo ssInfo;
	private User user;
	
	public SpreadsheetInfoRepoTests() {
		this.user = User.createTestUser("0");
		this.ssInfo = new SpreadsheetInfo("-", this.user, "A", "B", 1, true);
	}
	
	@Test
	public void testUserPojo() {
		assertTrue(this.user.isTestUser("0"));
	}
	
	@Test
	public void testSpreadsheetInfoPojo() {
		assertEquals("-", this.ssInfo.getSpreadsheetId());
		assertEquals(this.user, ssInfo.getUser());
		assertEquals("A", ssInfo.getQueCol());
		assertEquals("B", ssInfo.getAnsCol());
		assertEquals(1, ssInfo.getHeaderRows());
		assertEquals(true, ssInfo.isPublicAccess());
	}
	
	@Test
	public void testCreateSpreadsheetInfo() {
		when(this.ssiRepo.save(this.ssInfo))
			.thenReturn(this.ssInfo);
	}
	
	@Test
	public void testGetSpreadsheetInfoBySpreadsheetId() {
		when(this.ssiRepo.findById(this.ssInfo.getSpreadsheetId()))
			.thenReturn(Optional.of(this.ssInfo));
	}
	
	@Test
	public void testGetSpreadsheetInfoByUserId() {
		when(this.ssiRepo.findByUser_Uid(this.user.getUid()))
			.thenReturn(Collections.singletonList(this.ssInfo));
	}
	
	@Test
	public void testGetSpreadsheetInfoByPublicAccess() {
		when(this.ssiRepo.findByPublicAccess(this.ssInfo.isPublicAccess()))
			.thenReturn(Collections.singletonList(this.ssInfo));
	}

}
