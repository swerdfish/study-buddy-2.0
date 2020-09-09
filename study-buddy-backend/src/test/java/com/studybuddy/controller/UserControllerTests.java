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
import com.studybuddy.exception.ResourceNotFoundException;
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
	
	@Autowired
	public UserControllerTests(WebApplicationContext context) {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
				.apply(org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity())
				.build();
		this.user = User.createTestUser("0");
	}
	
	@Test
	public void ping_returnsPong() throws Exception {
		this.mockMvc.perform(
				get("/ping"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("pong")));
	}
	
	@Test
	public void registerWithUserInRequest_returnsCreated201() throws Exception {
		this.mockMvc.perform(
				post("/register")
				.contentType("application/json")
				.requestAttr("user", this.user))
			.andExpect(status().isCreated());
	}
	
	@Test
	public void registerWithoutUserInRequest_throwsAutenticationFailedException() throws Exception {
		this.mockMvc.perform(
				post("/register")
				.contentType("application/json"))
			.andExpect(status().isNotFound())
			.andExpect(result -> assertTrue(
					result.getResolvedException() instanceof ResourceNotFoundException))
			.andExpect(result -> assertEquals(
					"Failed to transfer user information from Google",
					result.getResolvedException().getMessage()));
	}
	
	@Test
	public void loginWithNonExistentUserInRequest_throwsAuthenticationFailedException() throws Exception {
		this.mockMvc.perform(
				post("/login")
				.contentType("applications/json")
				.requestAttr("user", this.user))
		.andExpect(status().isUnauthorized())
		.andExpect(result -> assertTrue(
				result.getResolvedException() instanceof AuthenticationFailedException))
		.andExpect(result -> assertEquals(
				"User "+this.user.getEmail()+" does not have an account. Please register instead.",
				result.getResolvedException().getMessage()));
	}
	
	@Test
	public void loginWithNonExistentUserInRequest_throwsAuthorizationFailedException() throws Exception {
		this.mockMvc.perform(
				post("/login")
				.contentType("applications/json")
				.requestAttr("user", this.user))
		.andExpect(status().isUnauthorized())
		.andExpect(result -> assertTrue(
				result.getResolvedException() instanceof AuthenticationFailedException))
		.andExpect(result -> assertEquals(
				"User "+this.user.getEmail()+" does not have an account. Please register instead.",
				result.getResolvedException().getMessage()));
	}

}
