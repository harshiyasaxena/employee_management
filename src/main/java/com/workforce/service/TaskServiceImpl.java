package com.workforce.service;

import com.workforce.dto.TaskRequestDto;
import com.workforce.entity.*;
import com.workforce.repository.TaskRepository;
import com.workforce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.workforce.dto.EmployeeDashboardStatsDto;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

        private final TaskRepository taskRepository;
        private final UserRepository userRepository;
        private final EmailService emailService;

        @Override
        public Task assignTask(TaskRequestDto dto) {

                User assignedBy = userRepository.findById(dto.getAssignedById())
                                .orElseThrow();

                // CASE 1: assign to all employees
                if (dto.isAssignToAll()) {

                        List<User> employees = userRepository.findByRole(Role.EMPLOYEE);

                        Task lastSavedTask = null;

                        for (User employee : employees) {

                                Task task = Task.builder()
                                                .title(dto.getTitle())
                                                .description(dto.getDescription())
                                                .priority(dto.getPriority())
                                                .deadline(dto.getDeadline())
                                                .status(TaskStatus.PENDING)
                                                .assignedTo(employee)
                                                .assignedBy(assignedBy)
                                                .createdAt(LocalDateTime.now())
                                                .build();

                                lastSavedTask = taskRepository.save(task);

                                emailService.sendEmail(
                                                employee.getEmail(),
                                                "New Task Assigned",
                                                "Hello " + employee.getName() + ",\n\n" +
                                                                "A new task has been assigned to you.\n\n" +
                                                                "Task: " + task.getTitle() + "\n" +
                                                                "Priority: " + task.getPriority() + "\n" +
                                                                "Deadline: " + task.getDeadline() + "\n\n" +
                                                                "Assigned By: " + assignedBy.getName() + "\n\n" +
                                                                "Regards,\n" +
                                                                "Workforce Management System");
                        }

                        return lastSavedTask;
                }

                // CASE 2: assign to many selected employees
                if (dto.getAssignedToIds() != null && !dto.getAssignedToIds().isEmpty()) {

                        List<User> selectedEmployees = userRepository.findAllById(dto.getAssignedToIds());
                        if (selectedEmployees.isEmpty()) {
                                throw new RuntimeException("No valid employees selected");
                        }

                        Task lastSavedTask = null;

                        for (User employee : selectedEmployees) {

                                Task task = Task.builder()
                                                .title(dto.getTitle())
                                                .description(dto.getDescription())
                                                .priority(dto.getPriority())
                                                .deadline(dto.getDeadline())
                                                .status(TaskStatus.PENDING)
                                                .assignedTo(employee)
                                                .assignedBy(assignedBy)
                                                .createdAt(LocalDateTime.now())
                                                .build();

                                lastSavedTask = taskRepository.save(task);

                                emailService.sendEmail(
                                                employee.getEmail(),
                                                "New Task Assigned",
                                                "Hello " + employee.getName() + ",\n\n" +
                                                                "A new task has been assigned to you.\n\n" +
                                                                "Task: " + task.getTitle() + "\n" +
                                                                "Priority: " + task.getPriority() + "\n" +
                                                                "Deadline: " + task.getDeadline() + "\n\n" +
                                                                "Assigned By: " + assignedBy.getName() + "\n\n" +
                                                                "Regards,\n" +
                                                                "Workforce Management System");
                        }

                        return lastSavedTask;
                }

                if (dto.getAssignedToId() == null) {
                        throw new RuntimeException("Please select an employee");
                }

                // CASE 3: assign to one employee
                User assignedTo = userRepository.findById(dto.getAssignedToId())
                                .orElseThrow();

                Task task = Task.builder()
                                .title(dto.getTitle())
                                .description(dto.getDescription())
                                .priority(dto.getPriority())
                                .deadline(dto.getDeadline())
                                .status(TaskStatus.PENDING)
                                .assignedTo(assignedTo)
                                .assignedBy(assignedBy)
                                .createdAt(LocalDateTime.now())
                                .build();

                Task savedTask = taskRepository.save(task);

                emailService.sendEmail(
                                assignedTo.getEmail(),
                                "New Task Assigned",
                                "Hello " + assignedTo.getName() + ",\n\n" +
                                                "A new task has been assigned to you.\n\n" +
                                                "Task: " + savedTask.getTitle() + "\n" +
                                                "Priority: " + savedTask.getPriority() + "\n" +
                                                "Deadline: " + savedTask.getDeadline() + "\n\n" +
                                                "Assigned By: " + assignedBy.getName() + "\n\n" +
                                                "Regards,\n" +
                                                "Workforce Management System");

                return savedTask;
        }

        @Override
        public List<Task> getAllTasks() {
                return taskRepository.findAll();
        }

        @Override
        public Task updateTaskStatus(Long taskId, TaskStatus status) {

                Task task = taskRepository.findById(taskId)
                                .orElseThrow();

                task.setStatus(status);

                return taskRepository.save(task);
        }

        @Override
        public List<Task> getMyTasks(String email) {

                return taskRepository.findByAssignedToEmail(email);
        }

        @Override
public EmployeeDashboardStatsDto getMyStats(String email) {

        List<Task> myTasks = taskRepository.findByAssignedToEmail(email);

        long assignedTasks = myTasks.size();

        long completedTasks = myTasks.stream()
                .filter(task -> task.getStatus() == TaskStatus.COMPLETED)
                .count();

        long pendingTasks = myTasks.stream()
                .filter(task -> task.getStatus() == TaskStatus.PENDING)
                .count();

        return new EmployeeDashboardStatsDto(
                assignedTasks,
                completedTasks,
                pendingTasks
        );
}

        @Override
        public void deleteTask(Long id) {

                taskRepository.deleteById(id);
        }
}