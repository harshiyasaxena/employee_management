package com.workforce.service;

import com.workforce.dto.TaskRequestDto;
import com.workforce.entity.Task;
import com.workforce.entity.TaskStatus;
import com.workforce.dto.EmployeeDashboardStatsDto;

import java.util.List;

public interface TaskService {

    Task assignTask(TaskRequestDto dto);

    List<Task> getAllTasks();

    Task updateTaskStatus(Long taskId, TaskStatus status);

    List<Task> getMyTasks(String email);

    void deleteTask(Long id);

    EmployeeDashboardStatsDto getMyStats(String email);
}