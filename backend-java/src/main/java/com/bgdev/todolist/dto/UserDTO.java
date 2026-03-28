package com.bgdev.todolist.dto;

import com.bgdev.todolist.entities.User;

public class UserDTO {

	private String name;
	private String email;
	private String password;

	
	public UserDTO(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public UserDTO() {
		
	}
	
	public UserDTO(User entity) {
		name = entity.getName();
		email = entity.getEmail();
		password = entity.getPassword();
	}
	
	
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
	
	
	
	
	
	
	
}
