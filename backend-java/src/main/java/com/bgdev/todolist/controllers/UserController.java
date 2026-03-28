package com.bgdev.todolist.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bgdev.todolist.dto.UserDTO;
import com.bgdev.todolist.entities.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping
public class UserController {

	@Autowired
	private UserService service;
	
	@PostMapping("/register")
	public UserDTO register(@RequestBody UserDTO dto) {
		
	return service.register(dto);
			
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserDTO dto, HttpSession session){
		dto = service.login(dto.getEmail(), dto.getPassword());
		
		if(dto != null) {
			session.setAttribute("userId", dto.getId());
			return ResponseEntity.ok(dto);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha invalidos");
		}
	}
	
	@GetMapping("/logged-user")
	public ResponseEntity<?> getLoggedUser(HttpSession session){
		Long userId = (Long) session.getAttribute("userId");
		
		if(userId != null) {
			UserDTO dto = service.searchById(userId);
			return ResponseEntity.ok(dto);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nenhum usario logado");
		}
	}
	
	@PostMapping("/logout")
	 public ResponseEntity<?> logout (HttpSession session){
		 session.invalidate();
		 return ResponseEntity.ok("Sessão encerrada com sucesso.");
	 }
	
	
}

