package com.ddaapp.fullstackjava.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ddaapp.fullstackjava.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
