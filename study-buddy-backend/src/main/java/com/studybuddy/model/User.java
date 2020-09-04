package com.studybuddy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString @EqualsAndHashCode
public class User {
	
	@Id
	private String uid;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	private String firstName;
	
	@Column(nullable = false)
	private String lastName;
	
	public static User createTestUser(String uid) {
		switch(uid) {
		case "0": return new User(uid, "test@test.com", "Tessa", "Testerson");
		case "1": return new User(uid, "owner@test.net", "Owen", "Ownerson");
		default: throw new IllegalArgumentException("Test users are only defined for uids \"0\" and \"1\"");
		}
	}
	
	public boolean isTestUser() {
		return this.equals(createTestUser("0")) || this.equals(createTestUser("1"));
	}
	
	public boolean isTestUser(String uid) {
		return uid.equals("0") || uid.equals("1") ? 
				this.equals(createTestUser(uid)) 
				: false;
	}

}
