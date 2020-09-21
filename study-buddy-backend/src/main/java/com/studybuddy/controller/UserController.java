package com.studybuddy.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studybuddy.exception.AuthenticationFailedException;
import com.studybuddy.exception.ResourceNotFoundException;
import com.studybuddy.model.User;
import com.studybuddy.service.UserService;

@RestController
@CrossOrigin(origins = "*", exposedHeaders = {"Authorization"})
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
	public User registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User u = (User) request.getAttribute("user");
		if (u==null)
			throw new ResourceNotFoundException(
					"Failed to transfer user information from Google");
		if (userServ.findByEmail(u.getEmail())!=null) {
			// Let the user log in if they already exist
			return u;
//			throw new ExistingUserRegistrationException(
//					"User "+u.getEmail()+" already has an account. Please login instead.");
		}
		response.setStatus(HttpStatus.CREATED.value());
		return userServ.createUser(u);
	}
	
	@PostMapping("/login")
	public User loginUser(HttpServletRequest request) throws IOException {
		User u = (User) request.getAttribute("user");
		String email = u.getEmail();
		if (userServ.findByEmail(email)==null) {
			throw new AuthenticationFailedException(
					"User "+u.getEmail()+" does not have an account. Please register instead.");
		} else {
			return u;
		}
	}

}
