package com.studybuddy.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.util.NestedServletException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.studybuddy.model.FlashcardDeck;
import com.studybuddy.model.SpreadsheetInfo;
import com.studybuddy.model.User;
import com.studybuddy.service.FlashcardDeckService;
import com.studybuddy.service.SpreadsheetInfoService;
import com.studybuddy.verifier.GoogleTokenVerifier;

@WebMvcTest(controllers = FlashcardDeckController.class)
public class FlashcardDeckControllerTests {
	
	private MockMvc mockMvc;
	private User testUser;
	private User ownerUser;
	private SpreadsheetInfo ssi;
	private FlashcardDeck fDeck;
	private ObjectMapper mapper;
	
	@MockBean
	private FlashcardDeckService fds;
	@MockBean
	private SpreadsheetInfoService ssis;
	@MockBean
	private GoogleTokenVerifier gtf;
	
	@Autowired
	public FlashcardDeckControllerTests(WebApplicationContext context) {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
				.apply(org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity())
				.build();
		this.testUser = User.createTestUser("0");
		this.ownerUser = User.createTestUser("1");
		this.ssi = SpreadsheetInfo.createTestSpreadsheetInfo();
		this.fDeck = FlashcardDeck.createTestFlashcardDeck();
		this.mapper = new ObjectMapper();
	}
	
	@Test
	public void createFlashcardDeck_returnsCreated201() throws JsonProcessingException, Exception {
		this.mockMvc.perform(
				post("/flashcardDeck")
				.content(this.mapper.writeValueAsString(this.fDeck))
				.contentType("application/json"))
		.andExpect(status().isCreated());
	}
	
	@Test
	public void createFlashcardDeckWithWrongObject_returnsNestedNullPointerException() throws JsonProcessingException, Exception {
		assertThrows(NullPointerException.class, () -> {
			try {
				this.mockMvc.perform(
						post("/flashcardDeck")
						.content(this.mapper.writeValueAsString(User.createTestUser("0")))
						.contentType("application/json"));
			} catch (NestedServletException e) {
				throw e.getCause();
			}
		});
	}

}
