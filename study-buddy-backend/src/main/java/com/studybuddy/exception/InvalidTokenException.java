package com.studybuddy.exception;

public class InvalidTokenException extends Exception {
	/**
	 * Exception thrown when token is invalid. Must have a message argument.
	 */
	private static final long serialVersionUID = -1641807551260813467L;

	public InvalidTokenException(String message) {
		super(message);
	}
}
