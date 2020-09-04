package com.studybuddy.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public User registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User u = (User) request.getAttribute("user");
		if (userServ.findByEmail(u.getEmail())!=null) {
			response.sendError(417, "User "+u.getEmail()+" already has an account. Please login instead.");
			return null;
		}
		return userServ.createUser(u);
	}
	
	@PostMapping("/login")
	public User loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User u = (User) request.getAttribute("user");
		if (userServ.findByEmail(u.getEmail())==null) {
			response.sendError(401, "User "+u.getEmail()+" does not have an account. Please register instead.");
			return null;
		} else {
			return u;
		}
	}

}
