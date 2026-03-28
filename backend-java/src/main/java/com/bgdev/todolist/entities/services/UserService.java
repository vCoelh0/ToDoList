package com.bgdev.todolist.entities.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bgdev.todolist.dto.UserDTO;
import com.bgdev.todolist.entities.User;
import com.bgdev.todolist.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	public UserDTO register (UserDTO dto) {
		
		User user = new User();
		
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());

		user = repository.save(user);
		return new UserDTO(user);
		
		
		
	}
	
	
}
