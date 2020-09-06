package com.studybuddy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AuthenticationFailedException extends RuntimeException {

	/**
	 * Thrown when unable to authenticate the google id token.
	 * Sends a 401 HTTP status code.
	 * Must have a message argument.
	 */
	private static final long serialVersionUID = 1148991119486235197L;
	
	public AuthenticationFailedException(String message) {
		super(message);
	}

}
