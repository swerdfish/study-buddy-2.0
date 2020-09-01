package com.studybuddy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studybuddy.model.User;
import com.studybuddy.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepo urepo;
	
	@Autowired
	public UserServiceImpl(UserRepo urepo) {
		this.urepo = urepo;
	}

	// CREATE
	
	@Override
	public User createUser(User user) {
		return urepo.save(user);
	}

	// READ
	
	@Override
	public User findByUserId(int id) {
		return urepo.findById(id).get();
	}

	@Override
	public User findByEmail(String email) {
		return urepo.findByEmail(email);
	}
	
	// UPDATE
	
	@Override
	public User updateUser(User user) {
		return urepo.save(user);
	}
	
	// DELETE
	
	@Override
	public void deleteUser(User user) {
		urepo.delete(user);
	}

}
