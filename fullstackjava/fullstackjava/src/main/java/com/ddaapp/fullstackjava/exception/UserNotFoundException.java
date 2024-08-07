package com.ddaapp.fullstackjava.exception;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(Long id) {
		super("Could not found the user with ID: " + id);
	}
}
