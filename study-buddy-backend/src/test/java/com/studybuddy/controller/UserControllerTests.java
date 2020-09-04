package com.studybuddy.controller;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studybuddy.model.User;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTests {
	
	private MockMvc mockMvc;
	private ObjectMapper mapper;
	private User user;
	
	@Autowired
	public UserControllerTests(MockMvc mockMvc, ObjectMapper mapper) {
		this.mockMvc = mockMvc;
		this.mapper = mapper;
		this.user = User.createTestUser("0");
	}
	
	@Test
	public void pingShouldReturnPongTest() throws Exception {
		this.mockMvc.perform(get("/ping"))
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("pong")));
	}
	
	@Test
	public void registerShouldReturnUserTest() throws Exception {
		this.mockMvc.perform(
				post("/register")
					.contentType("application/json"))
			.andExpect(status().isOk());
	}

}
