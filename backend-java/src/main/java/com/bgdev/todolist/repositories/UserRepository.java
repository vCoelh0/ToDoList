package com.bgdev.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bgdev.todolist.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
}
