package com.ddaapp.fullstackjava.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ddaapp.fullstackjava.exception.UserNotFoundException;
import com.ddaapp.fullstackjava.model.User;
import com.ddaapp.fullstackjava.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:3000")
public class UserController {
	@Autowired
	private UserRepository userRepository;
		
	@PostMapping("")
	public User create(@RequestBody User user) {
		return this.userRepository.save(user);
	}
	
	@GetMapping("")
	public List<User> users() {
		return this.userRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> user(@PathVariable Long id) {
		Optional<User> user = this.userRepository.findById(id);
		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		throw new UserNotFoundException(id);
	}
	
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return this.userRepository.findById(id)
				.map(user -> {
					user.setName(newUser.getName());
					user.setUsername(newUser.getUsername());
					user.setEmail(newUser.getEmail());
					return userRepository.save(user);
				}).orElseThrow(() ->new UserNotFoundException(id));
	}
	
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {
		if (!this.userRepository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		this.userRepository.deleteById(id);
		return "Delete user with ID: " + id + " successfully";
	}
}
