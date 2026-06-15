package com.workforce.controller;

import com.workforce.dto.TaskRequestDto;
import com.workforce.entity.Task;
import com.workforce.entity.TaskStatus;
import com.workforce.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task assignTask(@RequestBody TaskRequestDto dto) {
        return taskService.assignTask(dto);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(
            @PathVariable Long id,
            @RequestParam TaskStatus status) {

        return taskService.updateTaskStatus(id, status);
    }

    @GetMapping("/my")
    public List<Task> getMyTasks(
            Authentication authentication) {

        String email = authentication.getName();

        return taskService.getMyTasks(email);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }
}