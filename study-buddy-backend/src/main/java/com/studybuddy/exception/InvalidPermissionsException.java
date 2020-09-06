package com.studybuddy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidPermissionsException extends RuntimeException {

	/**
	 * Thrown when user tries to access data to which they do not have access.
	 * Sends a 403 http status code.
	 * Must have a message argument.
	 */
	private static final long serialVersionUID = 2237353591806202847L;
	
	public InvalidPermissionsException(String message) {
		super(message);
	}

}
