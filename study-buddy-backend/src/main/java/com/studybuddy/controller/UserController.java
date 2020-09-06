package com.studybuddy.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studybuddy.exception.AuthorizationFailedException;
import com.studybuddy.exception.ExistingUserRegistrationException;
import com.studybuddy.model.User;
import com.studybuddy.service.UserService;

@RestController
public class UserController {
	
	private UserService userServ;
	
	@Autowired
	public UserController(UserService userServ) {
		this.userServ = userServ;
	}
	
	@GetMapping("/ping")
	public String ping() {
		return "pong";
	}
	
	@PostMapping("/register")
	public User registerUser(HttpServletRequest request) throws IOException {
		User u = (User) request.getAttribute("user");
		if (u==null)
			throw new AuthorizationFailedException(
					"Failed to transfer user information from Google");
		if (userServ.findByEmail(u.getEmail())!=null) {
			throw new ExistingUserRegistrationException(
					"User "+u.getEmail()+" already has an account. Please login instead.");
		}
		return userServ.createUser(u);
	}
	
	@PostMapping("/login")
	public User loginUser(HttpServletRequest request) throws IOException {
		User u = (User) request.getAttribute("user");
		if (userServ.findByEmail(u.getEmail())==null) {
			throw new AuthorizationFailedException(
					"User "+u.getEmail()+" does not have an account. Please register instead.");
		} else {
			return u;
		}
	}

}
