package com.bgdev.todolist.entities.services;

import java.util.Optional;

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
	
	public UserDTO login (String email, String password) {
		Optional<User> user = repository.findByEmail(email);
		
		if(user.isPresent() && user.get().getPassword().equals(password)) {
			return new UserDTO(user.get());
		}else {
			return null;
		}			
	}
	
	public UserDTO searchById(Long id) {
		return repository.findById(id)
				.map(UserDTO::new)
				.orElseThrow(()-> new RuntimeException("Usuario não encontrado"));
	}
	
	
	

	
}
