package com.bgdev.todolist.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bgdev.todolist.dto.TasksDTO;
import com.bgdev.todolist.entities.services.TasksService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/task")
public class TasksController {

	@Autowired
	private TasksService service;
	
	@PostMapping()
	public ResponseEntity<TasksDTO> create(@RequestBody TasksDTO dto, HttpSession session){
		
		Long userId = (Long) session.getAttribute("userId");
		if(userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		TasksDTO newTask = service.create(dto, userId);
		return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
		
	}
	
	@DeleteMapping("/{id}")
	public void delete (@PathVariable Long id) {
		service.delete(id);
	}
	
}
