package com.studybuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studybuddy.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
	
	public User findByEmail(String email);

}
