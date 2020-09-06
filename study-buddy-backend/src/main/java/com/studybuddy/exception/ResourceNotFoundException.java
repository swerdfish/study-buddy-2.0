package com.studybuddy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

	/**
	 * Thrown when a resource is not found.
	 * Sends a 404 http status code.
	 * Message is required
	 */
	private static final long serialVersionUID = 9122667799854443381L;
	
	public ResourceNotFoundException(String message) {
		super(message);
	}

}
