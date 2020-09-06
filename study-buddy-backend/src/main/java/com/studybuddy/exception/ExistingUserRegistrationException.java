package com.studybuddy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class ExistingUserRegistrationException extends RuntimeException {

	/**
	 * Thrown when a user tries to register, but they already have an account.
	 * Sends a 417 http status code.
	 * Must have a message argument.
	 */
	private static final long serialVersionUID = 2419576212746839827L;
	
	public ExistingUserRegistrationException(String message) {
		super(message);
	}

}
