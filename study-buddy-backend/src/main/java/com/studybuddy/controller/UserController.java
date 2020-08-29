package com.studybuddy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.studybuddy.model.User;
import com.studybuddy.service.UserService;

@Controller
public class UserController {
	
	private UserService userServ;
	
	@Autowired
	public UserController(UserService userServ) {
		this.userServ = userServ;
	}
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		return user;
	}

}
