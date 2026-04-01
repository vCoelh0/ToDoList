package com.bgdev.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bgdev.todolist.entities.Tasks;

public interface TasksRepository extends JpaRepository<Tasks, Long>{

}
