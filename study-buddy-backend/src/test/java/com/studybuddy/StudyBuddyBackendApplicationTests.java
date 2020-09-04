package com.studybuddy;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.studybuddy.controller.FlashcardDeckController;
import com.studybuddy.controller.UserController;

@SpringBootTest
class StudyBuddyBackendApplicationTests {
	
	private FlashcardDeckController fdc;
	private UserController usc;
	
	@Autowired
	public StudyBuddyBackendApplicationTests(FlashcardDeckController fdc, UserController usc) {
		this.fdc = fdc;
		this.usc = usc;
	}

	@Test
	void contextLoads_FlashcardDeckController() {
		assertThat(fdc).isNotNull();
	}

	@Test
	void contextLoads_UserController() {
		assertThat(usc).isNotNull();
	}

}
