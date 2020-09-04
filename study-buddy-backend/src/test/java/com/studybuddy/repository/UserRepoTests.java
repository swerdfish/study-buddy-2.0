package com.studybuddy.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.studybuddy.model.User;

@SpringBootTest
@ContextConfiguration(classes = UserRepo.class)
public class UserRepoTests {
	
	@Mock
	private UserRepo urepo;
	
	private User user;
	
	public UserRepoTests() {
		this.user = User.createTestUser("0");
	}
	
	@Test
	public void testUserPojo() {
		assertTrue(this.user.isTestUser("0"));
//		assertEquals(this.user.getUid(), "0");
//		assertEquals(this.user.getEmail(), "test@test.com");
//		assertEquals(this.user.getFirstName(), "Tessa");
//		assertEquals(this.user.getLastName(), "Testerson");
	}
	
	@Test
	public void testCreateUser() {
		when(this.urepo.save(this.user)).thenReturn(this.user);
	}
	
	@Test
	public void testGetUserById() {
		when(this.urepo.findById("0")).thenReturn(Optional.of(this.user));
	}
	
	@Test
	public void testGetUserByEmail() {
		when(this.urepo.findByEmail("test@test.com")).thenReturn(this.user);
	}

}
