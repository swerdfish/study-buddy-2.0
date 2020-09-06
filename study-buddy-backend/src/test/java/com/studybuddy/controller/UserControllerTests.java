package com.studybuddy.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.studybuddy.exception.AuthenticationFailedException;
import com.studybuddy.filter.FlashcardDeckFilter;
import com.studybuddy.filter.UserFilter;
import com.studybuddy.model.User;
import com.studybuddy.service.UserService;
import com.studybuddy.verifier.GoogleTokenVerifier;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTests {
	
	private MockMvc mockMvc;
	private User user;
	
	@MockBean
	private UserService usrs;
	@MockBean
	private GoogleTokenVerifier gtf;
//	@MockBean
//	private UserFilter ufilt;
	
	@Autowired
	public UserControllerTests(WebApplicationContext context) {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
				.apply(org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity())
				.build();
		this.user = User.createTestUser("0");
	}
	
	@Test
	public void pingShouldReturnPongTest() throws Exception {
		this.mockMvc.perform(
				get("/ping"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("pong")));
	}
	
	@Test
	public void registerWithUserInRequest_returnsOk200() throws Exception {
		this.mockMvc.perform(
				post("/register")
				.contentType("application/json")
				.requestAttr("user", this.user))
			.andExpect(status().isOk());
	}
	
	@Test
	public void registerWithoutUserInRequest_throwsAuthorizationFailedException() throws Exception {
		this.mockMvc.perform(
				post("/register")
				.contentType("application/json"))
			.andExpect(status().isNotFound())
			.andExpect(result -> assertTrue(
					result.getResolvedException() instanceof AuthenticationFailedException))
			.andExpect(result -> assertEquals(
					"Failed to transfer user information from Google",
					result.getResolvedException().getMessage()));
	}
	
	@Test
	public void loginWithUserInRequest_returnsOk200() throws Exception {
		this.mockMvc.perform(
				post("/login")
				.contentType("applications/json")
				.requestAttr("user", this.user))
		.andExpect(status().isOk());
	}
	
	@Test
	public void loginWithoutGoogleIdToken_throwsAuthenticationFailedException() throws Exception {
		this.mockMvc.perform(
				post("/login")
				.contentType("applications/json")
				.requestAttr("user", this.user))
		.andExpect(status().isUnauthorized())
		.andExpect(result -> assertTrue(
				result.getResolvedException() instanceof AuthenticationFailedException))
		.andExpect(result -> assertEquals(
				"No id token found",
				result.getResolvedException().getMessage()));
	}
	
	@Test
	public void loginWithoutUserInRequest_throwsAuthorizationFailedException() throws Exception {
		this.mockMvc.perform(post("/login")
				.contentType("applications/json")
				.requestAttr("user", this.user))
		.andExpect(status().isNotFound())
		.andExpect(result -> assertTrue(
				result.getResolvedException() instanceof AuthorizationFailedException))
		.andExpect(result -> assertEquals(
				"User "+this.user.getEmail()+" already has an account. Please login instead.",
				result.getResolvedException().getMessage()));
	}

}
