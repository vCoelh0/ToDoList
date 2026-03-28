package com.bgdev.todolist.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bgdev.todolist.dto.UserDTO;
import com.bgdev.todolist.entities.services.UserService;

@RestController
@RequestMapping
public class UserController {

	@Autowired
	private UserService service;
	
	@PostMapping("/register")
	public UserDTO register(@RequestBody UserDTO dto) {
	return service.register(dto);
	
			
		
	}
	
}
