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

import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;

@SpringBootTest
@ContextConfiguration(classes = FlashcardDeckRepo.class)
public class FlashcardDeckRepoTests {
	
	@Mock
	private FlashcardDeckRepo fdr;
	
	private User deckUser;
	private User ssUser;
	private FlashcardDeck fd;
	private SpreadsheetInfo ssInfo;
	
	public FlashcardDeckRepoTests() {
		this.deckUser = User.createTestUser("0");
		this.ssUser = User.createTestUser("1");
		this.ssInfo = new SpreadsheetInfo("-", this.ssUser, "A", "B", 1, true);
		this.fd = new FlashcardDeck(0, this.deckUser, this.ssInfo, "#FFFFFF", "Test Deck");
	}
	
	@Test
	public void testDeckUserPojo() {
		assertTrue(this.deckUser.checkIsTestUser("0"));
//		assertEquals("0", this.deckUser.getUid());
//		assertEquals("test@test.com", this.deckUser.getEmail());
//		assertEquals("Tessa", this.deckUser.getFirstName());
//		assertEquals("Testerson", this.deckUser.getLastName());
	}
	
	@Test
	public void testSsUserPojo() {
		assertTrue(this.ssUser.checkIsTestUser("1"));
//		assertEquals("1", this.ssUser.getUid());
//		assertEquals("owner@test.com", this.ssUser.getEmail());
//		assertEquals("Owen", this.ssUser.getFirstName());
//		assertEquals("Ownerson", this.ssUser.getLastName());
	}
	
	@Test
	public void testSsInfoPojo() {
		assertEquals("-", this.ssInfo.getSpreadsheetId());
		assertEquals(this.ssUser, this.ssInfo.getUser());
		assertEquals("A", this.ssInfo.getQueCol());
		assertEquals("B", this.ssInfo.getAnsCol());
		assertEquals(1, this.ssInfo.getHeaderRows());
		assertEquals(true, this.ssInfo.isPublicAccess());
	}
	
	@Test
	public void testFlashcardDeckPojo() {
		assertEquals(0, this.fd.getDeckId());
		assertEquals(this.deckUser, this.fd.getUser());
		assertEquals(this.ssInfo, this.fd.getSpreadsheetInfo());
		assertEquals("#FFFFFF", this.fd.getColor());
		assertEquals("Test Deck", this.fd.getTitle());
	}
	
	@Test
	public void testCreateFlashcardDeck() {
		when(this.fdr.save(this.fd))
			.thenReturn(this.fd);
	}
	
	@Test
	public void testGetFlashcardDeckById() {
		when(this.fdr.findById(0))
			.thenReturn(Optional.of(this.fd));
	}
	
	@Test
	public void testGetFlashcardDeckByUserId() {
		when(this.fdr.findByUser_Uid(this.deckUser.getUid()))
			.thenReturn(Collections.singletonList(this.fd));
	}
	
	@Test
	public void testGetFlashcardDeckBySpreadsheetId() {
		when(this.fdr.findBySpreadsheetInfo_SpreadsheetId(this.ssInfo.getSpreadsheetId()))
			.thenReturn(Collections.singletonList(this.fd));
	}
	
	@Test
	public void testGetFlashcardDeckBySpreadsheetIdOwnedByUserId() {
		when(this.fdr.findBySpreadsheetInfoAndUser(
				this.ssInfo, this.deckUser))
			.thenReturn(Collections.singletonList(this.fd));
	}

}
