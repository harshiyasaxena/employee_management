package com.workforce.repository;

import com.workforce.entity.Task;
import com.workforce.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    long countByStatus(TaskStatus status);

    List<Task> findByDeadline(LocalDate deadline);

    List<Task> findByAssignedToEmail(String email);

    long countByDeadlineBeforeAndStatusNot(
            LocalDate date,
            TaskStatus status
    );
}