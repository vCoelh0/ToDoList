package com.bgdev.todolist.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bgdev.todolist.entities.Tasks;

public interface TasksRepository extends JpaRepository<Tasks, Long>{
	List<Tasks> findByUserId_Id(Long userId);

}
