package com.studybuddy.service;

import com.studybuddy.model.User;

public interface UserService {
	
	// Create
	public User createUser(User user);
	// Read
	public User findByUserId(int id);
	public User findByEmail(String email);
	// Update
	public User updateUser(User user);
	// Delete
	public void deleteUser(User user);

}
