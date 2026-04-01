package com.bgdev.todolist.dto;

import com.bgdev.todolist.entities.Tasks;
import com.bgdev.todolist.entities.User;

public class TasksDTO {

	private Long id;
	private String title;
	private Boolean completed;
	private User userId;
	
	public TasksDTO() {
		
	}

	
	public TasksDTO(Tasks entity) {
		id = entity.getId();
		title = entity.getTitle();
		completed = entity.getCompleted();
		userId = entity.getUserId();
	}

	
	
	public TasksDTO(Long id, String title, Boolean completed, User userId) {
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.userId = userId;
	}


	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public User getUserId() {
		return userId;
	}
	
	
	
	
}
