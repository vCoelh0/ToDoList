package com.bgdev.todolist.entities.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bgdev.todolist.dto.TasksDTO;
import com.bgdev.todolist.entities.Tasks;
import com.bgdev.todolist.entities.User;
import com.bgdev.todolist.repositories.TasksRepository;
import com.bgdev.todolist.repositories.UserRepository;

@Service
public class TasksService {
	
	@Autowired
	private TasksRepository taskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	public TasksDTO create(TasksDTO dto, Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(()-> new RuntimeException("Usuario Não encontrado"));
		
		
		Tasks task = new Tasks();
		
		task.setTitle(dto.getTitle());
		
		task.setUserId(user);
		task = taskRepository.save(task);
		
		return new TasksDTO(task);		
			
	}
	
}
