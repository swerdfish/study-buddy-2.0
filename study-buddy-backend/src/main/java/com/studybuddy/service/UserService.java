package com.studybuddy.service;

import com.studybuddy.model.User;

public interface UserService {
	
	// Create
	public User createUser(User user);
	// Read
	public User findByUserId(String uid);
	public User findByEmail(String email);
	// Update
	public User updateUser(User user);
	// Delete
	public void deleteUser(User user);
	// Exists
	public boolean existsUserByUid(String uid);

}
